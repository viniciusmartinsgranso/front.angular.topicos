import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { environment } from "../../environments/environment";
import { AuthenticateGuard } from "../guards/authentication.guards";

export const unAuthenticatedRoute = {
  canActivate: [AuthenticateGuard],
  data: {
    routeToRedirect: environment.config.redirectToWhenAuthenticated,
    unprotectedRoute: true,
  },
};

export const authenticatedRoute = {
  canActivate: [AuthenticateGuard],
  data: {
    routeToRedirect: environment.config.redirectToWhenUnauthenticated,
    protectedRoute: true,
  },
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'admin', component: AppLayoutComponent,
    ...authenticatedRoute,
    children: [
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
      },
      {
        path: 'proteins',
        loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule),
      },
      {
        path: 'drinks',
        loadChildren: () => import('./drinks/drinks.module').then(m => m.DrinksModule),
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    ...unAuthenticatedRoute
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsPageModule),
  },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
