import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] }
        ]
      },
      {
        label: 'Componentes',
        items: [
          { label: 'Categorias', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/categories'] },
          { label: 'Carboidratos', icon: 'pi pi-fw pi-box', routerLink: ['/admin/carbs'] },
          { label: 'Proteínas', icon: 'pi pi-fw pi-clipboard', routerLink: ['/admin/proteins'] },
          { label: 'Bebidas', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/admin/drinks'] },
        ]
      },
      {
        label: 'Utilities',
        items: [
          { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
          {
            label: 'PrimeFlex',
            icon: 'pi pi-fw pi-desktop',
            url: ['https://www.primefaces.org/primeflex/'],
            target: '_blank'
          },
        ]
      },
    ];
  }
}
