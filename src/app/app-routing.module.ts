import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCreateComponent } from './pages/book/book-create/book-create.component';
import { BookListComponent } from './pages/book/book-list/book-list.component';
import { BookEditComponent } from './pages/book/book-edit/book-edit.component';
import { GenderListComponent } from './pages/gender/gender-list/gender-list.component';
import { GenderCreateComponent } from './pages/gender/gender-create/gender-create.component';
import { GenderEditComponent } from './pages/gender/gender-edit/gender-edit.component';
import { AuthorListComponent } from './pages/author/author-list/author-list.component';
import { AuthorCreateComponent } from './pages/author/author-create/author-create.component';
import { AuthorEditComponent } from './pages/author/author-edit/author-edit.component';
import { BookComponent } from './pages/book/book.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: BookComponent,
  },
  {
    path: 'book',
    component: BookComponent,
  },
  {
    path: 'book/create',
    component: BookCreateComponent,
  },
  {
    path: 'book/:id',
    component: BookEditComponent,
  },
  {
    path: 'gender',
    component: GenderListComponent,
  },
  {
    path: 'gender/create',
    component: GenderCreateComponent,
  },
  {
    path: 'gender/:id',
    component: GenderEditComponent,
  },
  {
    path: 'author',
    component: AuthorListComponent,
  },
  {
    path: 'author/create',
    component: AuthorCreateComponent,
  },
  {
    path: 'author/:id',
    component: AuthorEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
