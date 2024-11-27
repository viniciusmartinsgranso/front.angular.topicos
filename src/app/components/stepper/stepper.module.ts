//#region Imports

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoreThanOrEqualPipeModule } from 'src/app/pipes/more-than-or-equal/more-than-or-equal.module';
import { StepperComponent } from './stepper.component';

//#endregion

@NgModule({
  imports: [CommonModule, MoreThanOrEqualPipeModule],
  exports: [StepperComponent],
  declarations: [StepperComponent],
})
export class StepperModule {}
