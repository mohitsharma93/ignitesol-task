import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-gutenberg-category',
  templateUrl: 'gutenberg-category.component.html',
})
export class GutenbergCategoryComponent implements OnInit {
  protected genres = [
    { label: 'FICTION', icon: 'assets/icons/Fiction.svg' },
    { label: 'PHILOSOPHY', icon: 'assets/icons/Philosophy.svg' },
    { label: 'DRAMA', icon: 'assets/icons/Drama.svg' },
    { label: 'HISTORY', icon: 'assets/icons/History.svg' },
    { label: 'HUMOUR', icon: 'assets/icons/Humour.svg' },
    { label: 'ADVENTURE', icon: 'assets/icons/Adventure.svg' },
    { label: 'POLITICS', icon: 'assets/icons/Politics.svg' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  goToBook(book: any) {
    this.router.navigate(['/books', book.label]);
  }
}
