import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaltPizzasComponent } from "./salt-pizzas.component";



@NgModule({
  declarations: [
    SaltPizzasComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SaltPizzasComponent
  ]
})
export class SaltPizzasModule { }
