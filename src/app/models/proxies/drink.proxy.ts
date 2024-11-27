import { BaseProxy } from "./base.proxy";

export interface DrinkProxy extends BaseProxy {
  name: string;
  price: number;
  imageUrl: string;
}