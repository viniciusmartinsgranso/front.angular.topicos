import { Pipe, PipeTransform } from '@angular/core';
import { CategoryProxy } from "../models/proxies/categoryProxy";
import { isValid } from "../shared/utils/functions";

@Pipe({
  name: 'ingredientsName',
  standalone: true
})
export class IngredientsNamePipe implements PipeTransform {

  transform(ingredients?: CategoryProxy[], cap?: number): string {
    if (!ingredients) {
      return '-';
    }

    if (!ingredients.length) {
      return 'Sem ingredientes';
    }

    const names = ingredients
      .map((ingredient) => {
        const name = ingredient.name || '<Sem nome>';
        return name.length > 40 ? name.substring(0, 40) + '...' : name;
      })
      .sort((nameA, nameB) => {
        if (nameA.startsWith('<')) {
          return 1;
        }

        if (nameB.startsWith('<')) {
          return -1;
        }

        return nameA.toLowerCase() < nameB.toLowerCase() ? -1 : 1;
      });

    if (isValid(cap) && ingredients.length > 3) {
      return (
        names.splice(0, cap).join(', ') + ` e mais ${ ingredients.length - cap }`
      );
    }

    return names.join(', ');
  }
}
