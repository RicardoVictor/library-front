import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorCreateComponent } from './pages/author/author-create/author-create.component';
import { AuthorEditComponent } from './pages/author/author-edit/author-edit.component';
import { AuthorComponent } from './pages/author/author.component';
import { BookCreateComponent } from './pages/book/book-create/book-create.component';
import { BookEditComponent } from './pages/book/book-edit/book-edit.component';
import { BookComponent } from './pages/book/book.component';
import { GenderCreateComponent } from './pages/gender/gender-create/gender-create.component';
import { GenderEditComponent } from './pages/gender/gender-edit/gender-edit.component';
import { GenderComponent } from './pages/gender/gender.component';

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
    path: 'author',
    component: AuthorComponent,
  },
  {
    path: 'author/create',
    component: AuthorCreateComponent,
  },
  {
    path: 'author/:id',
    component: AuthorEditComponent,
  },
  {
    path: 'gender',
    component: GenderComponent,
  },
  {
    path: 'gender/create',
    component: GenderCreateComponent,
  },
  {
    path: 'gender/:id',
    component: GenderEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
