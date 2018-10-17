import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "../login/login.component";

import { AddCategoryComponent } from "../add-category/add-category.component";
import { ListCategoryComponent } from "../list-category/list-category.component";
import { EditCategoryComponent } from "../edit-category/edit-category.component";

import { ListSalePlaceComponent } from "../list-sale-place/list-sale-place.component";
import { AddSalePlaceComponent } from '../add-sale-place/add-sale-place.component';
import { EditSalePlaceComponent } from '../edit-sale-place/edit-sale-place.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'add-category', component: AddCategoryComponent },
  { path: 'list-category', component: ListCategoryComponent },
  { path: 'edit-category', component: EditCategoryComponent },

  { path: 'list-sale-place', component: ListSalePlaceComponent },
  { path: 'add-sale-place', component: AddSalePlaceComponent },
  { path: 'edit-sale-place', component: EditSalePlaceComponent },
  
  { path : '', component : LoginComponent }
];

export const routing = RouterModule.forRoot(routes);
