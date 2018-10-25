import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileSelectDirective } from 'ng2-file-upload';

import {  MatToolbarModule,
          MatButtonModule,
          MatSidenavModule,
          MatIconModule,
          MatListModule,
          MatCardModule,
          MatInputModule,
          MatDialogModule,
          MatBadgeModule,
          MatCheckboxModule,
          MatSnackBarModule,
          MatSelectModule
        } from '@angular/material';

import { LoginComponent } from './login/login.component';

import { AddEventComponent } from './event/add-event/add-event.component';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { ListEventComponent } from './event/list-event/list-event.component';
import { EventService } from './service/event.service';

import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { CategoryService } from './service/category.service';

import { AddSalePlaceComponent } from './sale-place/add-sale-place/add-sale-place.component';
import { EditSalePlaceComponent } from './sale-place/edit-sale-place/edit-sale-place.component';
import { ListSalePlaceComponent } from './sale-place/list-sale-place/list-sale-place.component';
import { SalePlaceService } from './service/salePlace.service';

import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { UserService } from './service/user.service';

import { routing } from './core/app.routing';
import { AuthenticationService } from './service/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/token.inteceptor';
import { TokenStorage } from './core/token.storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { DeleteConfirmDialogComponent } from './shared/delete-confirm-dialog/delete-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    LoginComponent,
    AddEventComponent,
    EditEventComponent,
    ListEventComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ListCategoryComponent,
    ListSalePlaceComponent,
    AddSalePlaceComponent,
    EditSalePlaceComponent,
    ListUserComponent,
    EditUserComponent,
    AddUserComponent,
    DeleteConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  providers: [
    AuthenticationService,
    EventService,
    CategoryService,
    SalePlaceService,
    UserService,
    TokenStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DeleteConfirmDialogComponent
  ]
})
export class AppModule { }
