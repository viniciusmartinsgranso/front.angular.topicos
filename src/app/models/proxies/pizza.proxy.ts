import { BaseProxy } from "./base.proxy";
import { PizzaTypeEnum } from "../enums/pizzaTypeEnum";
import { CategoryProxy } from "./categoryProxy";

export interface PizzaProxy extends BaseProxy {
  name: string;
  ingredientsIds: number[];
  type: PizzaTypeEnum;
  imageUrl: string;
  ingredients: CategoryProxy[];
  canRemoveIngredientsIds?: number[];
  canRemoveIngredients?: CategoryProxy[];
}
