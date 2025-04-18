import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GutenbergCategoryComponent } from '../gutenberg-category/gutenberg-category.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  imports: [CommonModule, GutenbergCategoryComponent],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
