import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CategoryService } from "../../service/category.service";
import { Category } from "../../model/category.model";
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteConfirmDialogComponent } from '../../shared/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  categories: Category[];
  constructor(private router: Router, private categoryService: CategoryService, private dialog: MatDialog) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe( data => {
        this.categories = data["categories"];
      });
  }

  deleteCategory(category: Category): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        title: 'Are you sure you want to delete it?',
        content: ''
    };

    const dialogReference = this.dialog.open(DeleteConfirmDialogComponent, dialogConfig);
    dialogReference.afterClosed().subscribe(result => {
      if (result == true) {
        this.categoryService.deleteCategory(category.uuid)
        .subscribe( (w) => {
          this.categories = this.categories.filter(u => u !== category);
        })
      }
    });
    
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
