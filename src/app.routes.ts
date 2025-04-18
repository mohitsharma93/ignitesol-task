import { Routes } from '@angular/router';

export const routes: Routes = [
  // { path: 'shop', component: ShopComponent },
  // { path: 'cart', component: CartComponent },
  // { path: 'counter', component: CounterComponent },
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((mod) => mod.HomeComponent),
  },
  {
    path: 'books/:topic',
    loadComponent: () =>
      import('./books/books.component').then((mod) => mod.BooksComponent),
  },
];
