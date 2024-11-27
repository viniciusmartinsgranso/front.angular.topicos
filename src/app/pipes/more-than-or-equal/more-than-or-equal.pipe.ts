//#region Imports

import { Pipe, PipeTransform } from '@angular/core';

//#endregion

@Pipe({
  name: 'moreThanOrEqual',
})
export class MoreThanOrEqualPipe implements PipeTransform {
  public transform(value: number, compareTo: number): boolean {
    return value >= compareTo;
  }
}
