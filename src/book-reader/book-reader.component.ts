import { Component, Input } from '@angular/core';
import { SafeUrlPipe } from "../pipe/safe-url.pipe";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-reader',
  templateUrl: './book-reader.component.html',
  imports: [SafeUrlPipe, CommonModule],
})
export class BookReaderComponent {
  @Input() bookUrl!: string | null;

  closeModal() {
    this.bookUrl = null;
  }
}