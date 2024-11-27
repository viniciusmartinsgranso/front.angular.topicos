import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateDrinkComponent } from "./update-drink.component";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { PaginatorModule } from "primeng/paginator";
import { ReactiveFormsModule } from "@angular/forms";
import { RippleModule } from "primeng/ripple";



@NgModule({
  declarations: [
    UpdateDrinkComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    MultiSelectModule,
    PaginatorModule,
    ReactiveFormsModule,
    RippleModule
  ],
  exports: [
    UpdateDrinkComponent
  ]
})
export class UpdateDrinkModule { }
