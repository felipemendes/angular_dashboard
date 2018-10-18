import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "../../service/category.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.min.css']
})

export class AddCategoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private categoryService: CategoryService) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      uuid: [],
      status: ['', Validators.required],
      title: ['', Validators.required],
      url_image: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addForm.invalid) {
      return;
    }

    this.categoryService.createCategory(this.addForm.value)
      .subscribe(
        () => {
          this.router.navigate(['list-category']);
        },
        err => console.log(err)
      );
  }
}
