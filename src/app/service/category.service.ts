import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from "../model/category.model";

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:3000/categories';

  getCategories() {
    /* let fakeCategories = {"categories":[{"id":1,"uuid":"1670d1f8-8d9e-46bb-8a19-b85cdd27e016","status":1,"title":"Test Angular","url_image":"uploads/sample-category.png"}]};
   return Observable.of(fakeCategories).delay(5000);*/
    return this.http.get<Category[]>(this.baseUrl);
  }

  getCategoryById(uuid: string) {
    return this.http.get<Category>(this.baseUrl + '/' + uuid);
  }

  createCategory(category: Category) {
    return this.http.post(this.baseUrl, category);
  }

  updateCategory(category: Category) {
    return this.http.put(this.baseUrl + '/' + category.uuid, category);
  }

  deleteCategory(uuid: string) {
    return this.http.delete(this.baseUrl + '/' + uuid);
  }
}