import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { booksUrl } from '../urls/books';

@Injectable({ providedIn: 'root' })
export class ApiService {
  #http = inject(HttpClient);

  // getBooks(queryParam) {
  //   return
  // }
}
