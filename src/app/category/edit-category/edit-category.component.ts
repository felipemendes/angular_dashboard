import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.min.css']
})
export class EditCategoryComponent implements OnInit {

  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private categoryService: CategoryService) { }

  ngOnInit() {
    const categoryUuid = localStorage.getItem('editCategoryUuid');
    const categoryStatus = localStorage.getItem('editCategoryStatus');

    if (!categoryUuid) {
      alert('Invalid action.');
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

    this.categoryService.getCategoryByUuid(categoryUuid, parseInt(categoryStatus, 2))
      .subscribe( data => {
        this.editForm.setValue(data['categories'][0]);
      });
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }

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
