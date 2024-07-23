import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCreateComponent } from './pages/book/book-create/book-create.component';
import { BookListComponent } from './pages/book/book-list/book-list.component';
import { BookEditComponent } from './pages/book/book-edit/book-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: BookListComponent,
  },
  {
    path: 'book',
    component: BookListComponent,
  },
  {
    path: 'create',
    component: BookCreateComponent,
  },
  {
    path: 'user/:id',
    component: BookEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
