import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CategoryService } from "../service/category.service";
import { Category } from "../model/category.model";

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  categories: Category[];

  constructor(private router: Router, private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe( data => {
        this.categories = data.categories;
      });
  }

  deleteCategory(category: Category): void {
    this.categoryService.deleteCategory(category.uuid)
      .subscribe( data => {
        this.categories = this.categories.filter(u => u !== category);
      })
  };

  editCategory(category: Category): void {
    localStorage.removeItem("editCategoryUuid");
    localStorage.setItem("editCategoryUuid", category.uuid.toString());
    this.router.navigate(['edit-category']);
  };

  addCategory(): void {
    this.router.navigate(['add-category']);
  };
}
