import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category.model';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) { }

  baseUrl: string = environment.baseUrl + '/categories';

  getCategories(status: number = 1, page: number = 1) {
    return this.http.get<Category[]>(this.baseUrl + '/?status=' + status + '&page=' + page + '&limit=10');
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
