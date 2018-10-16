import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ModalModule } from 'ngx-bootstrap/modal';

import { LoginComponent } from './login/login.component';

import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { CategoryService } from "./service/category.service";

import { ListSalePlaceComponent } from './list-sale-place/list-sale-place.component';
import { SalePlaceService } from './service/salePlace.service';

import { routing } from "./core/app.routing";
import { AuthenticationService } from "./service/auth.service";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./core/token.inteceptor";
import { TokenStorage } from "./core/token.storage";
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ListCategoryComponent,
    HeaderComponent,
    SidebarComponent,
    ListSalePlaceComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    CategoryService,
    SalePlaceService,
    TokenStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
