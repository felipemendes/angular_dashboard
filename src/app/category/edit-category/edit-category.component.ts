import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../service/category.service";
import { Router } from "@angular/router";
import { Category } from "../../model/category.model";
import { FormBuilder, FormGroup, Validators}  from "@angular/forms";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  category: Category;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private categoryService: CategoryService) { }

  ngOnInit() {
    let categoryUuid = localStorage.getItem("editCategoryUuid");
    if(!categoryUuid) {
      alert("Invalid action.")
      this.router.navigate(['list-category']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],
      uuid: [],
      status: ['', Validators.required],
      title: ['', Validators.required],
      url_image: ['', Validators.required]
    });

    this.categoryService.getCategoryByUuid(categoryUuid)
      .subscribe( data => {
        this.editForm.setValue(data["categories"][0]);
      });
  }

  onSubmit() {
    this.categoryService.updateCategory(this.editForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['list-category']);
        },
        error => {
          alert(error);
        }
      );
  }

}
