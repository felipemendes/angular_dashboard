import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../model/category.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteConfirmDialogComponent } from '../../shared/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.min.css']
})
export class ListCategoryComponent implements OnInit {

  baseUrl: string = environment.baseUrl;
  categories: Category[];
  currentPage = 0;

  constructor(private router: Router,
              private categoryService: CategoryService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.currentPage ++;
    this.loadCategories();
  }

  loadCategories(status = 1) {
    this.categoryService.getCategories(status, this.currentPage)
      .subscribe(
        res => {
          this.categories = res['categories'];
        },
        () => {
          this.snackBar.open('Could not load data. Check server.', 'Okay');
        }
      );
  }

  olderPage() {
    this.currentPage --;
    this.loadCategories();
  }

  newerPage() {
    this.currentPage ++;
    this.loadCategories();
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
      if (result === true) {
        this.categoryService.deleteCategory(category.uuid)
        .subscribe(
          res => {
            this.snackBar.open(res['message'], 'Nice');
            this.categories = this.categories.filter(u => u !== category);
          },
          err => {
            this.snackBar.open('Check server: ' + err, 'Okay');
          }
        );
      }
    });
  }

  editCategory(category: Category): void {
    localStorage.removeItem('editCategoryUuid');
    localStorage.setItem('editCategoryUuid', category.uuid.toString());

    localStorage.removeItem('editCategoryStatus');
    localStorage.setItem('editCategoryStatus', category.status.toString());

    this.router.navigate(['edit-category']);
  }

  addCategory(): void {
    this.router.navigate(['add-category']);
  }

  showInactives(): void {
    this.loadCategories(0);
  }
}
