import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaCardComponent } from "./pizza-card.component";
import { DividerModule } from "primeng/divider";
import { CheckboxModule } from "primeng/checkbox";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    PizzaCardComponent
  ],
  imports: [
    CommonModule,
    DividerModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    PizzaCardComponent
  ]
})
export class PizzaCardModule { }
