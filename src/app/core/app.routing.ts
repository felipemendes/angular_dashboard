import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';

import { AddEventComponent } from '../event/add-event/add-event.component';
import { EditEventComponent } from '../event/edit-event/edit-event.component';
import { ListEventComponent } from '../event/list-event/list-event.component';

import { AddCategoryComponent } from '../category/add-category/add-category.component';
import { ListCategoryComponent } from '../category/list-category/list-category.component';
import { EditCategoryComponent } from '../category/edit-category/edit-category.component';

import { ListSalePlaceComponent } from '../sale-place/list-sale-place/list-sale-place.component';
import { AddSalePlaceComponent } from '../sale-place/add-sale-place/add-sale-place.component';
import { EditSalePlaceComponent } from '../sale-place/edit-sale-place/edit-sale-place.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'add-event', component: AddEventComponent },
  { path: 'list-event', component: ListEventComponent },
  { path: 'edit-event', component: EditEventComponent },

  { path: 'add-category', component: AddCategoryComponent },
  { path: 'list-category', component: ListCategoryComponent },
  { path: 'edit-category', component: EditCategoryComponent },

  { path: 'list-sale-place', component: ListSalePlaceComponent },
  { path: 'add-sale-place', component: AddSalePlaceComponent },
  { path: 'edit-sale-place', component: EditSalePlaceComponent },

  { path : '', component : LoginComponent }
];

export const routing = RouterModule.forRoot(routes);
