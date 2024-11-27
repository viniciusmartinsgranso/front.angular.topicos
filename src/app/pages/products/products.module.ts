import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsPage } from './products.page';

import { HomePageRoutingModule } from './products-routing.module';
import { BannerModule } from "../../components/banner/banner.module";
import { PizzaCardModule } from "../../components/pizza-card/pizza-card.module";
import { ButtonModule } from "primeng/button";
import { DrinkCardModule } from "../../components/drink-card/drink-card.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    BannerModule,
    ReactiveFormsModule,
    PizzaCardModule,
    ButtonModule,
    DrinkCardModule,
  ],
  declarations: [ProductsPage]
})
export class ProductsPageModule {}
