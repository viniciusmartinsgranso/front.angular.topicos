import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { PizzaTypeEnum, translatedPizzaTypeEnum } from "../../models/enums/pizzaTypeEnum";
import { ProducsMenuInterface } from "../../models/interfaces/producs-menu.interface";
import { appName } from "../../../environments/title";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { PizzaProxy } from "../../models/proxies/pizza.proxy";
import { DrinkProxy } from "../../models/proxies/drink.proxy";
import { PizzaService } from "../../services/pizza/pizza.service";
import { DrinkService } from "../../services/drink/drink.service";
import { OrdersService } from "../../services/orders/orders.service";
import { HelperService } from "../../services/helper/helper.service";

@Component({
  selector: 'app-products',
  templateUrl: 'products.page.html',
  styleUrls: ['products.page.scss'],
})
export class ProductsPage implements OnInit {

  //region Inject Services

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  private readonly router: Router = inject(Router);

  private readonly pizzaService: PizzaService = inject(PizzaService);

  private readonly drinkService: DrinkService = inject(DrinkService);

  private readonly orderService: OrdersService = inject(OrdersService);

  private readonly helperService: HelperService = inject(HelperService);

  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  //#endregion

  constructor() {
    this.formGroup = this.formBuilder.group({
      pizzas: new FormArray([]),
      drinks: new FormArray([]),
      table: [0, Validators.required]
    });
  }

  //#region Public Properties

  public formGroup!: FormGroup;

  public products: ProducsMenuInterface[] = [
    {
      name: PizzaTypeEnum.SALT,
      tabId: 'salt'
    },
    {
      name: PizzaTypeEnum.SWEET,
      tabId: 'sweet'
    }
  ];

  public translatedProducts: Record<PizzaTypeEnum, string> = translatedPizzaTypeEnum

  public appName: string = appName;

  public selectedTab: string = 'salt';

  public pizzas: PizzaProxy[] = [];

  public drinks: DrinkProxy[] = [];

  private table: number = 0;

  //#endregion

  //#region Life Cycle Methods

  public async ngOnInit(): Promise<void> {
    [this.pizzas, this.drinks] = await Promise.all([
      this.getPizzas(),
      this.getDrinks()
    ]);

    this.activatedRoute.queryParams.subscribe((route: Params) => {
      this.table = +route['mesa'];
      this.formGroup.controls['table'].setValue(this.table);
    });

    this.pizzas.forEach(pizza => {
      const pizzaFormGroup = this.formBuilder.group({
        isSelected: [false],
        name: [pizza.name],
        type: [pizza.type],
        removableIngredients: [],
      });
      (this.formGroup.get('pizzas') as FormArray).push(pizzaFormGroup);
    });

    this.drinks.forEach(drink => {
      const drinkFormGroup = this.formBuilder.group({
        name: [drink.name],
        amount: []
      });
      (this.formGroup.get('drinks') as FormArray).push(drinkFormGroup);
    });
  }

  //#endregion

  //#region Public Methods

  public async setTabMenu(tabId: string): Promise<void> {
    await this.router.navigateByUrl(`/home/${ tabId }`);
  }

  public async getPizzas(): Promise<PizzaProxy[]> {
    return await this.pizzaService.getMany();
  }

  public async getDrinks(): Promise<DrinkProxy[]> {
    return await this.drinkService.getMany();
  }

  public trackBy(index: number): number {
    return index;
  }

  public async onSubmit(): Promise<void> {
    let payload = this.formGroup.getRawValue();

    console.log(payload)

    payload.pizzas = payload.pizzas.filter((pizza: any) => pizza.isSelected);

    payload.drinks = payload.drinks.filter((drink: any) => drink.amount > 0)

    if (!payload.pizzas.length)
      return void this.helperService.error('Oops...', 'Você precisa escolher uma pizza pelo menos.');

    const [response, message] = await this.orderService.createOrder(payload);

    if (!response)
      return this.helperService.error('Oops...', message);

    this.helperService.success('Parabéns!', message);
  }
}
