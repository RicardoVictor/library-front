import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorCreateComponent } from './pages/author/author-create/author-create.component';
import { AuthorEditComponent } from './pages/author/author-edit/author-edit.component';
import { AuthorFilterComponent } from './pages/author/author-filter/author-filter.component';
import { AuthorListComponent } from './pages/author/author-list/author-list.component';
import { AuthorComponent } from './pages/author/author.component';
import { BookCreateComponent } from './pages/book/book-create/book-create.component';
import { BookEditComponent } from './pages/book/book-edit/book-edit.component';
import { BookFilterComponent } from './pages/book/book-filter/book-filter.component';
import { BookListComponent } from './pages/book/book-list/book-list.component';
import { BookComponent } from './pages/book/book.component';
import { GenderCreateComponent } from './pages/gender/gender-create/gender-create.component';
import { GenderEditComponent } from './pages/gender/gender-edit/gender-edit.component';
import { GenderFilterComponent } from './pages/gender/gender-filter/gender-filter.component';
import { GenderListComponent } from './pages/gender/gender-list/gender-list.component';
import { GenderComponent } from './pages/gender/gender.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookCreateComponent,
    BookEditComponent,
    ModalComponent,
    NavbarComponent,
    AuthorCreateComponent,
    AuthorEditComponent,
    AuthorListComponent,
    GenderListComponent,
    GenderEditComponent,
    GenderCreateComponent,
    BookComponent,
    BookFilterComponent,
    AuthorComponent,
    AuthorFilterComponent,
    GenderComponent,
    GenderFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
