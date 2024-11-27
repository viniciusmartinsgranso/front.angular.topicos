//#region Imports

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoreThanOrEqualPipe } from './more-than-or-equal.pipe';

//#endregion

@NgModule({
  imports: [CommonModule],
  declarations: [MoreThanOrEqualPipe],
  exports: [MoreThanOrEqualPipe],
})
export class MoreThanOrEqualPipeModule {}
