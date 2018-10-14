import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TokenStorage } from '../core/token.storage';
import { Category } from "../model/category.model";
import { headersToString } from 'selenium-webdriver/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient, private token: TokenStorage) { }

  baseUrl: string = 'http://localhost:3000/categories';

  getCategories() {
    /* let fakeCategories = {"categories":[{"id":1,"uuid":"1670d1f8-8d9e-46bb-8a19-b85cdd27e016","status":1,"title":"Test Angular","url_image":"uploads/sample-category.png"}]};
   return Observable.of(fakeCategories).delay(5000);*/
    return this.http.get<Category[]>(this.baseUrl);
  }

  getCategoryByUuid(uuid: string) {
    console.log(this.baseUrl + '/?uuid=' + uuid);
    return this.http.get<Category>(this.baseUrl + '/?uuid=' + uuid);
  }

  createCategory(category: Category) {
    //httpOptions.headers.append('Authorization', 'Bearer ' + this.token.getToken());
    return this.http.post(this.baseUrl, category);
  }

  updateCategory(category: Category) {
    return this.http.put(this.baseUrl + '/' + category.uuid, category);
  }

  deleteCategory(uuid: string) {
    return this.http.delete(this.baseUrl + '/' + uuid);
  }
}