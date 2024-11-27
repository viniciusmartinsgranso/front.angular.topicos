import { Component, inject, OnInit } from '@angular/core';
import { HelperService } from "../../../services/helper/helper.service";
import { Table } from "primeng/table";
import { Router } from "@angular/router";
import { DrinkProxy } from "../../../models/proxies/drink.proxy";
import { DrinkService } from "../../../services/drink/drink.service";

@Component({
  selector: 'app-drinks',
  templateUrl: './list-drinks.component.html',
  styleUrls: ['./list-drinks.component.scss']
})
export class ListDrinksComponent implements OnInit {

  private readonly drinkService: DrinkService = inject(DrinkService);

  private readonly helperService: HelperService = inject(HelperService);

  private readonly router: Router = inject(Router);

  public deleteProductDialog: boolean = false;

  public deleteProductsDialog: boolean = false;

  public drinks: DrinkProxy[] = [];

  public drink: DrinkProxy;

  public selectedDrinks: DrinkProxy[] = [];

  public submitted: boolean = false;

  public cols: any[] = [];

  public rowsPerPageOptions: number[] = [5, 10, 20];

  public id: number = 0;

  public async ngOnInit(): Promise<void> {
    this.drinks = await this.drinkService.getMany();

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Nome' },
      { field: 'price', header: 'Preço' },
    ];
  }

  public async openNew(): Promise<void> {
    return void await this.router.navigateByUrl('/admin/drinks/create');
  }

  public async editEntity(drink: DrinkProxy): Promise<void> {
    return void this.router.navigateByUrl(`/admin/drinks/update/${ drink.id }`);
  }

  public deleteSelectedDrinks() {
    this.deleteProductsDialog = true;
  }

  public deactivate(drink: DrinkProxy) {
    this.deleteProductDialog = true;
    this.drink = drink;
  }

  public confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.drinks = this.drinks.filter(val => !this.selectedDrinks.includes(val));
    this.helperService.success('Sucesso!', 'Bebidas desativadas com sucesso!')
    this.selectedDrinks = [];
  }

  public async confirmDelete(): Promise<void> {
    this.deleteProductDialog = false;

    const canDeactivate = await this.drinkService.deactivate(this.drink.id);

    if (!canDeactivate)
      this.helperService.success('Oops...', 'Ocorreu um erro, tente novamente.')

    this.helperService.success('Sucesso!', 'Bebida desativada com sucesso!');

    this.drink = {
      ...this.drink,
      name: ''
    };
    window.location.reload();
  }

  public async activate(drink: DrinkProxy): Promise<void> {
    const [canUpdate, message] = await this.drinkService.activate(drink.id);

    this.submitted = true;

    if (!canUpdate && message)
      return void this.helperService.error('Oops...', message);

    this.helperService.success('Sucesso!', 'Bebida atualizada com sucesso!');
    window.location.reload();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
