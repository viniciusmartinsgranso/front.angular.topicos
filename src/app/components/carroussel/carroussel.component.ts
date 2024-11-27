import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carroussel',
  templateUrl: './carroussel.component.html',
  styleUrls: ['./carroussel.component.scss'],
})
export class CarrousselComponent  implements OnInit {

  constructor() { }

  @Input({ required: true })
  public images: string[] = [];

  @Input()
  public timer: number = 0;

  public currentIndex: number = 0;

  public ngOnInit(): void {
    setInterval(() => {
      this.nextImage();
    }, this.timer * 1000);
  }

  public nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  public prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  public isFirstImage(): boolean {
    return this.currentIndex === 0;
  }

  public isLastImage(): boolean {
    return this.currentIndex === this.images.length - 1;
  }

}
