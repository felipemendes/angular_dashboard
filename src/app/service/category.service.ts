import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from '../core/token.storage';
import { Category } from "../model/category.model";

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient, private token: TokenStorage) { }

  baseUrl: string = environment.baseUrl + '/categories';

  getCategories(status: number = 1) {
    return this.http.get<Category[]>(this.baseUrl + '/?status=' + status);
  }

  getCategoryByUuid(uuid: string, status: number = 1) {
    return this.http.get<Category>(this.baseUrl + '/?uuid=' + uuid + '&status=' + status);
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