import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrinkCardComponent } from './drink-card.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { SliderModule } from "primeng/slider";



@NgModule({
  declarations: [
    DrinkCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    SliderModule,
  ],
  exports: [
    DrinkCardComponent
  ]
})
export class DrinkCardModule { }
