import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stepper',
  template: ` <div
    class="w-full flex align-items-center justify-content-center"
  >
    <ng-container *ngFor="let item of items; let i = index; let isLast = last">
      <div
        class="flex align-items-center justify-content-center border-round-xl bg-primary font-bold select-none fadeinright transition-all transition-duration-500"
        [style.height.rem]="2.5"
        [style.width.rem]="2.5"
        [style.animation-duration.s]="(i + 1) * 0.2"
        [class.bg-primary]="selectedIndex | moreThanOrEqual: i"
        [class.surface-ground]="!(selectedIndex | moreThanOrEqual: i)"
        [class.text-gray-400]="!(selectedIndex | moreThanOrEqual: i)"
      >
        {{ i + 1 }}
      </div>
      <div
        *ngIf="!isLast"
        class="flex flex-1 w-full mx-2 fadeinright transition-all transition-duration-500"
        [class.bg-primary]="selectedIndex | moreThanOrEqual: i"
        [class.surface-ground]="!(selectedIndex | moreThanOrEqual: i)"
        [style.animation-duration.s]="(i + 1) * 0.2"
        [style.height.px]="2"
      ></div>
    </ng-container>
  </div>`,
})
export class StepperComponent implements OnChanges {
  //#region Public Properties

  @Input({ required: true })
  public selected!: string | number;

  @Input({ required: true })
  public items!: (string | number)[];

  public selectedIndex: number = 0;

  //#endregion

  //#region Lifecyle Events

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['selected']) {
      this.selectedIndex = this.items.indexOf(this.selected);
    }
  }

  //#endregion
}
