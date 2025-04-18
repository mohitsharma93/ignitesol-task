
**Project Name:** Gutenberg Project

**Description:** This is an Angular-based web application that allows users to search for books by topic or author. The app uses a RESTful API to fetch book data and displays the results in a grid layout.

**Features:**

* Search bar to input search queries
* Grid layout to display book results
* Book details display, including title, author, and cover image
* Load more functionality to fetch additional book results
* Error handling for API errors

**Technical Details:**

* Built with Angular 19.2.0
* Uses Tailwind CSS for styling
* Utilizes the `@angular/common` and `@angular/core` libraries
* Employs the `WritableSignal` concept for reactive programming
* Leverages the `rxjs` library for observable management

**Components:**

* `BooksComponent`: responsible for rendering the book grid and handling search queries
* `BookReaderComponent`: displays book details in a modal window
* `HomeComponent`: serves as the app's entry point

**Services:**

* `BookService`: handles API requests for book data

**Models:**

* `Book`: represents a single book entity
* `BooksResponseModel`: represents the API response for book data

**Routes:**

* `/`: root route, redirects to the `HomeComponent`
* `/books/:topic`: route for searching books by topic

**API:**

* `booksUrl`: API endpoint for fetching book data

**Styles:**

* Tailwind CSS configuration file: `tailwind.config.ts`
* Global styles: `src/global_styles.css`

**Development:**

* Run `ng serve` to start the development server
* Run `ng build` to build the production-ready application

**Dependencies:**

* `@angular/animations`
* `@angular/common`
* `@angular/compiler`
* `@angular/core`
* `@angular/forms`
* `@angular/platform-browser`
* `@angular/router`
* `@tailwindcss/postcss`
* postcss
* `rxjs`
* `tailwindcss`
* `tslib`
* `zone.js`

**Run Local:**

1. **Clone the repository**
2. **Install dependencies** : `npm install`
3. **Start the development server** : ng serve
4. **Open the app in your browser** : `http://localhost:4200`
5. **Test the app** : Search for books by topic or author, and verify that the app displays the correct results.

**Troubleshooting:**

* If you encounter issues with the development server, try running `ng serve --port 4201` to use a different port.
* If you encounter issues with the API, verify that the `booksUrl` endpoint is correctly configured and that the API is responding correctly.
