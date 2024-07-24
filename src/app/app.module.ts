import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './pages/book/book-list/book-list.component';
import { BookCreateComponent } from './pages/book/book-create/book-create.component';
import { FormsModule } from '@angular/forms';
import { BookEditComponent } from './pages/book/book-edit/book-edit.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AuthorCreateComponent } from './pages/author/author-create/author-create.component';
import { AuthorEditComponent } from './pages/author/author-edit/author-edit.component';
import { AuthorListComponent } from './pages/author/author-list/author-list.component';
import { GenderListComponent } from './pages/gender/gender-list/gender-list.component';
import { GenderEditComponent } from './pages/gender/gender-edit/gender-edit.component';
import { GenderCreateComponent } from './pages/gender/gender-create/gender-create.component';
import { BookFilterComponent } from './pages/book/book-filter/book-filter.component';
import { BookComponent } from './pages/book/book.component';

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
    BookFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
