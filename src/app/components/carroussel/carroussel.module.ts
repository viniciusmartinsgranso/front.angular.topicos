import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrousselComponent } from "./carroussel.component";



@NgModule({
  declarations: [
      CarrousselComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
      CarrousselComponent
  ]
})
export class CarrousselModule { }
