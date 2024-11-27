import { PizzaTypeEnum } from "../enums/pizzaTypeEnum";
import { UploadFileInterface } from "../interfaces/upload-file.interface";

export interface CreatePizzaPayload {
  name: string;
  type: PizzaTypeEnum;
  ingredientIds: string[];
  image: UploadFileInterface;
}