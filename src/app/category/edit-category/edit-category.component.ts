import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
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

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private categoryService: CategoryService,
              private snackBar: MatSnackBar) { }

  baseUrl: string = environment.baseUrl;
  editForm: FormGroup;
  statusFormatted;
  fileSelected: File = null;

  ngOnInit() {
    const categoryUuid = localStorage.getItem('editCategoryUuid');
    const categoryStatus = localStorage.getItem('editCategoryStatus');

    if (!categoryUuid) {
      this.snackBar.open('Invalid action.', 'Not nice');
      this.router.navigate(['list-category']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],
      uuid: [],
      status: ['', Validators.required],
      title: ['', Validators.required],
      url_image: ['']
    });

    this.categoryService.getCategoryByUuid(categoryUuid, parseInt(categoryStatus, 2))
      .subscribe(
        res => {
          this.editForm.setValue(res['categories'][0]);
        },
        err => {
          this.snackBar.open(err, 'Not nice');
        }
      );
  }

  onFileSelected(event) {
    this.fileSelected = <File>event.target.files[0];
    this.editForm.get('url_image').setValue(this.fileSelected, this.fileSelected.name);
  }

  onSubmit() {
    if (this.editForm.invalid) {
      this.snackBar.open('Invalid form. Try again', 'Okay');
      return;
    }

    this.statusFormatted = this.editForm.get('status').value === true ? '1' : this.editForm.get('status').value;

    const formData = new FormData();
    formData.append('id', this.editForm.get('id').value);
    formData.append('uuid', this.editForm.get('uuid').value);
    formData.append('status', this.statusFormatted);
    formData.append('title', this.editForm.get('title').value);

    if (this.fileSelected != null) {
      formData.append('url_image', this.fileSelected, this.fileSelected.name);
    }

    this.categoryService.updateCategory(formData)
      .pipe(first())
      .subscribe(
        res => {
          this.snackBar.open(res['message'], 'Nice');
          this.router.navigate(['list-category']);
        },
        err => {
          this.snackBar.open(err, 'Not nice');
        }
      );
  }
}
