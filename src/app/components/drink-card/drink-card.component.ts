import { Component, Input, OnInit } from '@angular/core';
import { DrinkProxy } from "../../models/proxies/drink.proxy";
import { SliderChangeEvent } from "primeng/slider";

@Component({
  selector: 'app-drink-card',
  templateUrl: './drink-card.component.html',
  styleUrls: ['./drink-card.component.scss']
})
export class DrinkCardComponent implements OnInit {

  //#region Public Properties

  @Input({ required: true })
  public drink: DrinkProxy;

  @Input({ required: true })
  public form: any;

  //#endregion

  //#region Public Methods

  ngOnInit(): void {
    this.form.controls['amount'].setValue(0);
  }

  public setAmount(event: SliderChangeEvent) {
    this.form.controls['amount'].setValue(event.value);
  }

  //#endregion

}
