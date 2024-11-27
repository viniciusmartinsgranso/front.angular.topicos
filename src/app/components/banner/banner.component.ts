import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent  implements OnInit {

  constructor() { }

  public bannerImages: string[] = ['assets/images/pizza.jpg', 'assets/images/pizza.jpg', 'assets/images/pizza.jpg', 'assets/images/pizza.jpg'];

  ngOnInit() {}

}
