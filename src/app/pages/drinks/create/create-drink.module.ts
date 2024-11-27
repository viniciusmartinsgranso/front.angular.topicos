import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDrinkComponent } from "./create-drink.component";
import { DropdownModule } from "primeng/dropdown";
import { ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { InputNumberModule } from "primeng/inputnumber";

@NgModule({
  declarations: [
    CreateDrinkComponent,
  ],
  imports: [
    CommonModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    MultiSelectModule,
    ButtonModule,
    RippleModule,
    InputNumberModule,
  ],
  exports: [
    CreateDrinkComponent
  ]
})
export class CreateDrinkModule { }
