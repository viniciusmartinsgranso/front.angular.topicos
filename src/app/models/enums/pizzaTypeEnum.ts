export enum PizzaTypeEnum {
  'SWEET' = 0,
  'SALT' = 1,
}

export const translatedPizzaTypeEnum: Record<PizzaTypeEnum, string> = {
  [PizzaTypeEnum.SALT]: 'Salgada',
  [PizzaTypeEnum.SWEET]: 'Doce',
}