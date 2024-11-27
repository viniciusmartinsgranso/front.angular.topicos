import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HelperService } from "../../../services/helper/helper.service";
import { Router } from "@angular/router";
import { CategoryProxy } from "../../../models/proxies/categoryProxy";
import { DrinkService } from "../../../services/drink/drink.service";
import { MediaService } from "../../../services/medias/media.service";

@Component({
  selector: 'app-create',
  templateUrl: './create-drink.component.html',
  styleUrls: ['./create-drink.component.scss']
})
export class CreateDrinkComponent {

  constructor() {
    this.formGroup = this.formBuilder.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
    });
  }

  //#region Injectable Properties

  private readonly drinkService: DrinkService = inject(DrinkService);

  private readonly helperService: HelperService = inject(HelperService);

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  private readonly router: Router = inject(Router);

  private readonly mediaService: MediaService = inject(MediaService);

  //#endregion

  //#region Public Properties

  public formGroup: FormGroup;

  //#endregion

  //#region Public Methods

  public async onSubmit(): Promise<void> {
    const payload = this.formGroup.getRawValue();

    const [ pizza, message ] = await this.drinkService.create(payload);

    if (!pizza && message) {
      return void this.helperService.error('Oops...', message);
    }

    this.helperService.success('Sucesso!', 'Bebida criada com sucesso!');

    return void await this.router.navigateByUrl('/admin/drinks');
  }

  public async cancel(): Promise<void> {
    await this.router.navigateByUrl('/admin/drinks');
  }

  public async getBase64(event: Event): Promise<void> {
    if (!event.target) return;

    const fileList = (event.target as HTMLInputElement).files;
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0] as File;
    if (!file) return;

    const [canUpload, imageOrError] = await this.mediaService.uploadImage(file);

    if (!canUpload)
      return void this.helperService.error('Erro.', imageOrError);

    this.formGroup.controls['imageUrl'].setValue(imageOrError);
  }

  //#endregion

}
