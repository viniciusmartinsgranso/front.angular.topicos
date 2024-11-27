import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { filter, Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  protected readonly router: Router = inject(Router);

  constructor() {
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((route) => {
        const routerEvent = route as NavigationEnd;

        if (this.routesWithNavbar.includes(routerEvent.url)) {
          if (this.routesWithNavbar.includes(routerEvent.urlAfterRedirects))
            this.canShowNavbar = true;
        } else {
          this.canShowNavbar = false;
        }
      });
  }

  public canShowNavbar: boolean = false;

  public routesWithNavbar: string[] = ['/products'];

  public routeSubscription: Subscription = new Subscription();

}
