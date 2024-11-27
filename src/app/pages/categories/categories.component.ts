import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CategoryProxy } from "../../models/proxies/categoryProxy";
import { CategoryService } from "../../services/ingredient/category.service";
import { HelperService } from "../../services/helper/helper.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../environments/environment";
import { HttpAsyncService } from "../../modules/http-async/services/http-async.service";
import { getCrudErrors } from "../../shared/utils/functions";

@Component({
  templateUrl: './categories.component.html',
  providers: [MessageService]
})
export class CategoriesComponent implements OnInit {

  private readonly categoryService: CategoryService = inject(CategoryService);

  private readonly helperService: HelperService = inject(HelperService);

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  private readonly http: HttpAsyncService = inject(HttpAsyncService);

  constructor() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public formGroup!: FormGroup;

  public isCreating: boolean = false;

  public isEdit: boolean = false;

  public deleteCategoryDialog: boolean = false;

  public deleteCategoriesDialog: boolean = false;

  public categories: CategoryProxy[] = [];

  public category!: CategoryProxy;

  public selectedCategories: CategoryProxy[] = [];

  public submitted: boolean = false;

  public cols: any[] = [];

  public rowsPerPageOptions: number[] = [5, 10, 20];

  public id: number = 0;

  public async ngOnInit(): Promise<void> {
    await this.getFruits();

    this.cols = [
      { field: 'name', header: 'Categoria' },
      { field: 'isActive', header: 'Ativo?' }
    ];
  }

  public openNew() {
    this.submitted = false;
    this.isCreating = true;
  }

  public deleteSelectedCategories() {
    this.deleteCategoriesDialog = true;
  }

  public async editEntity(product: CategoryProxy): Promise<void> {
    this.id = product.id;

    const [ingredient, message] = await this.categoryService.getOne(product.id);

    if (message)
      return void this.helperService.error('Oops...', message);

    this.formGroup = this.formBuilder.group({ name: ingredient!.name });
    this.isEdit = true;
  }

  public async saveEditCategory(): Promise<void> {
    const payload = this.formGroup.getRawValue();

    const [canUpdate, message] = await this.categoryService.updateOne(payload, String(this.id));

    if (!canUpdate)
      return void this.helperService.error('Oops...', message);

    this.submitted = true;
    this.isEdit = false;
    this.helperService.success('Sucesso!', message);
    await this.getFruits();
  }

  public deleteEntity(ingredient: CategoryProxy) {
    this.deleteCategoryDialog = true;
    this.id = ingredient.id;
  }

  public confirmDeleteSelected() {
    this.deleteCategoriesDialog = false;
    this.categories = this.categories.filter(val => !this.selectedCategories.includes(val));
    this.helperService.success('Sucesso!', 'Ingrediente deletado com sucesso!')
    this.selectedCategories = [];
  }

  public async confirmDelete(): Promise<void> {
    this.deleteCategoryDialog = false;

    const [canDelete, message] = await this.categoryService.deactivate(this.id);

    if (!canDelete && message)
      return void this.helperService.error('Oops...', message);

    this.helperService.success('Sucesso!', 'Ingrediente deletado com sucesso!');
    await this.getFruits();
  }

  public async activate(ingredient: CategoryProxy): Promise<void> {
    const canUpdate = await this.categoryService.activate(ingredient.id);

    this.submitted = true;

    if (!canUpdate)
      return void this.helperService.error('Oops...', 'Ocorreu um erro, tente novamente');

    this.helperService.success('Sucesso!', 'Ingrediente criado com sucesso!');
    window.location.reload();
  }

  hideDialog() {
    this.isCreating = false;
    this.isEdit = false;
    this.submitted = false;
  }

  public async saveCategory(): Promise<void> {
    const payload = this.formGroup.getRawValue();

    const [ canCreate, message ] = await this.categoryService.create(payload);

    this.submitted = true;
    this.isCreating = false;

    if (!canCreate)
      return void this.helperService.error('Oops...', message);

    this.formGroup.reset();

    this.helperService.success('Sucesso!', 'Ingrediente criado com sucesso!');
    await this.getFruits();
  }

  private async getFruits(): Promise<void> {
    this.categories = [];
    this.categories = await this.categoryService.getMany();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
