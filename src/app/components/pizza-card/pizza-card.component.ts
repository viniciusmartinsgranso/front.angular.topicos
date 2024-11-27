import { Component, Input } from '@angular/core';
import { PizzaProxy } from "../../models/proxies/pizza.proxy";

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.scss'],
})
export class PizzaCardComponent {

  constructor() { }

  @Input({ required: true })
  public pizza: PizzaProxy;

  @Input({ required: true })
  public form: any;

  public isSelected: boolean = false;

  public selectedIngredients: string[] = [];

  public toggleSelection(value: boolean) {
    this.isSelected = value;
    this.form.controls['isSelected'].setValue(value);
  }

  public setIngredientValue(value: any) {
    setTimeout(() => null, 3000)
    this.form.get('removableIngredients').setValue(value);
  }

}
