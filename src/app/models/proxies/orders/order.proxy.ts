import { BaseProxy } from "../base.proxy";
import { DrinksOrder } from "./drinks-order.proxy";
import { PizzasOrder } from "./pizzas-order.proxy";

export interface OrderProxy extends BaseProxy {
  drinks: DrinksOrder[];
  pizzas: PizzasOrder[];
  isFinished: boolean;
}