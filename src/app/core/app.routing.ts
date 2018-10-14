import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "../login/login.component";
import { AddCategoryComponent } from "../add-category/add-category.component";
import { ListCategoryComponent } from "../list-category/list-category.component";
import { EditCategoryComponent } from "../edit-category/edit-category.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'list-category', component: ListCategoryComponent },
  { path: 'edit-category', component: EditCategoryComponent },
  {path : '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
