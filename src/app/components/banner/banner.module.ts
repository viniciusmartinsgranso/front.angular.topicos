import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from "./banner.component";
import { CarrousselModule } from "../carroussel/carroussel.module";



@NgModule({
  declarations: [
    BannerComponent
  ],
  imports: [
    CommonModule,
    CarrousselModule,
  ],
  exports: [
    BannerComponent
  ]
})
export class BannerModule { }
