import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
  viewChild
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { booksUrl } from '../urls/books';
import { objectToQueryParam, getQueryParams } from '../utils';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, map, catchError, tap, debounceTime } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Author, Book, BooksResponseModel } from '../models/books';
import { BookReaderComponent } from "../book-reader/book-reader.component";

@Component({
  standalone: true,
  selector: 'app-books',
  templateUrl: 'books.component.html',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, BookReaderComponent]
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly loadTrigger = viewChild.required<ElementRef>('loadTrigger');

  protected showToast: boolean = false;
  private observer?: IntersectionObserver;
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  public location: Location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);
  protected searchControl: FormControl = new FormControl('');

  public queryParams: WritableSignal<any> = signal<any>(
    {}
  );

  protected books: WritableSignal<BooksResponseModel> = signal({} as BooksResponseModel);

  protected rxBooks = rxResource<BooksResponseModel, any>({
    request: () => this.queryParams(),
    loader: ({ request }) =>
      this.http.get<any>(`${booksUrl.get}?${objectToQueryParam(request)}`).pipe(
        distinctUntilChanged(),
        map((res) => {
          const { results, ...rest } = res;
          const newRes = {
            ...rest,
            results: results.map((p: Book) => ({...p, authors: p.authors.map((author: Author) => author.name).join(', ')}))
          }
          const books = this.books();
          if(books.results?.length > 0) {
            this.books.set({
              ...rest,
              results: [...books.results, ...newRes.results]
            })
          } else {
            this.books.set(newRes)
          }
          return newRes;
        }),
        takeUntilDestroyed(this.destroyRef),
        catchError(() => {
          throw Error('Unable to load!');
        })
      ),
  });

  constructor() {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.queryParams.set({
        ...this.queryParams().value,
        topic: params['topic'],
      })
    });
    this.searchControl.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(700),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (value) => {
        if(value.length){
          this.books.set({} as BooksResponseModel);
          this.queryParams.set({
            ...this.queryParams(),
            search: value,
          })
        }
      }
    })
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const {count = null, results = [] } = this.books();
        if(count && count > results.length) {
          this.queryParams.set(getQueryParams(this.books().next))
        }
      }
    }, {
      rootMargin: '100px',
      threshold: 0.1
    });

    const loadTrigger = this.loadTrigger();
    if (loadTrigger?.nativeElement) {
      this.observer.observe(loadTrigger.nativeElement);
    }
  }

  public ngOnDestroy() {
    this.observer?.disconnect();
  }

  protected goBack() {
    this.location.back();
  }


  /**
   * Clears the search input and removes the 'search' parameter from queryParams.
   * This function sets the search input value to an empty string and updates the
   * query parameters to exclude the 'search' key, effectively clearing any
   * active search filters.
   */

  protected clearSearch() {
    this.searchControl.setValue('');
    const { search, ...rest } = this.queryParams();
    this.queryParams.set(rest);
  }

  selectedBookUrl: string | null = null;

  /**
   * Open a book in a new window or show a toast if the book only has zip format.
   * @param book The book to open.
   * @remarks
   * The order of preference for the formats is:
   * 1. HTML
   * 2. PDF
   * 3. TXT
   * 4. ZIP
   * If the book does not have any of the above formats, a toast will be shown.
   * If the book only has ZIP format, a confirmation dialog will be shown before
   * downloading the file.
   */
  openBook(book: any): void {
    const formats = book.formats;
    const htmlUrl = formats['text/html; charset=utf-8'] || formats['text/html'];
    const pdfUrl = formats['application/pdf'];
    const txtUrl = formats['text/plain; charset=utf-8'] || formats['text/plain'];
    const zipUrl = formats['application/zip'] || formats['application/octet-stream'];

    const previewUrl = htmlUrl || pdfUrl || txtUrl || null;

    if (previewUrl) {
        this.selectedBookUrl = previewUrl;
    } else if(!zipUrl) {
      this.showNoFormatToast();
    }

    if (zipUrl && !previewUrl) {
      const confirmDownload = confirm('This book is only available as a .zip file. Do you want to download it?');
      if (confirmDownload) {
        window.open(zipUrl, '_blank');
      }
    }
  }

  showNoFormatToast() {
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3000); // Auto hide after 3s
  }
}
