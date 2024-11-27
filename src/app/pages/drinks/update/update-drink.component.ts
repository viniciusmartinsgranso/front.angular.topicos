import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PizzaService } from "../../../services/pizza/pizza.service";
import { DropdownOption } from "../../../models/interfaces/dropdown-option.interface";
import { CategoryService } from "../../../services/ingredient/category.service";
import { CategoryProxy } from "../../../models/proxies/categoryProxy";
import { HelperService } from "../../../services/helper/helper.service";
import { MediaService } from "../../../services/medias/media.service";
import { DrinkService } from "../../../services/drink/drink.service";

@Component({
  selector: 'app-update-drink',
  templateUrl: './update-drink.component.html',
  styleUrls: ['./update-drink.component.scss']
})
export class UpdateDrinkComponent implements OnInit {

  constructor() {
    this.formGroup = this.formBuilder.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
    });

    this.id = +this.route.snapshot.params['id'];
  }

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  private readonly router: Router = inject(Router);

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  private readonly helperService: HelperService = inject(HelperService);

  private readonly drinkService: DrinkService = inject(DrinkService);

  private readonly imageService: MediaService = inject(MediaService);

  public formGroup: FormGroup;

  public id: number = 0;

  public imageUrl: string = '';

  public async ngOnInit(): Promise<void> {
    await this.getDrink();
  }

  public async cancel(): Promise<void> {
    return void await this.router.navigateByUrl('/admin/drinks');
  }

  public async onSubmit(): Promise<void> {
    const payload = this.formGroup.getRawValue();

    const [canUpdate, message] = await this.drinkService.update(this.id, payload);

    if (!canUpdate && message)
      return this.helperService.error('Oops...', message);

    this.helperService.success('Sucesso!', 'Bebida atualizada com sucesso!');
    return void this.router.navigateByUrl('/admin/drinks');
  }

  public async getBase64(event: any): Promise<void> {
    if (!event.target) return;

    const fileList = (event.target as HTMLInputElement).files;
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0] as File;
    if (!file) return;

    const [canUpload, imageOrError] = await this.imageService.uploadImage(file);

    if (!canUpload)
      return void this.helperService.error('Erro.', imageOrError!);


    this.formGroup.controls['imageUrl'].setValue(imageOrError);
  }

  private async getDrink(): Promise<void> {
    const [drink, message] = await this.drinkService.getOne(this.id);

    if (!drink) {
      this.helperService.error('Oops...', message!)
      return void await this.router.navigateByUrl('/admin/drinks');
    }

    this.formGroup.patchValue({
      name: drink.name,
      price: drink.price,
      imageUrl: drink.imageUrl,
    });
  }
}
