import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDrinkComponent } from './create/create-drink.component';
import { UpdateDrinkComponent } from './update/update-drink.component';
import { RouterModule, Routes } from "@angular/router";
import { ListDrinksComponent } from "./list/list-drinks.component";
import { ListDrinksModule } from "./list/list-drinks.module";
import { CreateDrinkModule } from "./create/create-drink.module";
import { UpdateDrinkModule } from "./update/update-drink.module";

const routes: Routes = [
  { path: '', component: ListDrinksComponent },
  { path: 'create', component: CreateDrinkComponent },
  { path: 'update/:id', component: UpdateDrinkComponent }
]

@NgModule({
  imports: [
    CommonModule,
    ListDrinksModule,
    CreateDrinkModule,
    UpdateDrinkModule,
    RouterModule.forChild(routes)
  ]
})
export class DrinksModule {
}
