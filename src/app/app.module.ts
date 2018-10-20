import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileSelectDirective } from 'ng2-file-upload';

// tslint:disable-next-line:max-line-length
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatInputModule, MatDialogModule, MatBadgeModule, MatCheckboxModule, MatSnackBarModule } from '@angular/material';

import { LoginComponent } from './login/login.component';

import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { CategoryService } from './service/category.service';

import { AddSalePlaceComponent } from './sale-place/add-sale-place/add-sale-place.component';
import { EditSalePlaceComponent } from './sale-place/edit-sale-place/edit-sale-place.component';
import { ListSalePlaceComponent } from './sale-place/list-sale-place/list-sale-place.component';
import { SalePlaceService } from './service/salePlace.service';

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
    AddCategoryComponent,
    EditCategoryComponent,
    ListCategoryComponent,
    ListSalePlaceComponent,
    AddSalePlaceComponent,
    EditSalePlaceComponent,
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
    MatSnackBarModule
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
  bootstrap: [AppComponent],
  entryComponents: [
    DeleteConfirmDialogComponent
  ]
})
export class AppModule { }
