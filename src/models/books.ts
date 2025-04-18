import { KeyValue } from '@angular/common';

export interface Book {
    id: number;
    title: string;
    authors: Author[];
    translators: Translator[]; // can use Author[] if same structure
    subjects: string[];
    bookshelves: string[];
    languages: string[];
    copyright: boolean;
    media_type: string;
    formats: Record<string, string>;
    download_count: number;
    }

export interface Author {
    name: string;
    birth_year: number;
    death_year: number;
}
  
export type Translator = Author; 

export interface BooksResponseModel {
    count: number;
    next: string;
    previous: string;
    results: Book[]
}

