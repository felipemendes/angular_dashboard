import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.min.css']
})

export class AddCategoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private categoryService: CategoryService) { }

  addForm: FormGroup;
  statusFormatted;
  fileSelected: File = null;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      uuid: [],
      status: ['', Validators.required],
      title: ['', Validators.required],
      url_image: ['', Validators.required]
    });
  }

  onFileSelected(event) {
    this.fileSelected = <File>event.target.files[0];
    this.addForm.get('url_image').setValue(this.fileSelected, this.fileSelected.name);
  }

  onSubmit() {
    if (this.addForm.invalid) {
      return;
    }

    this.statusFormatted = this.addForm.get('status').value === true ? '1' : '0';

    const formData = new FormData();
    formData.append('status', this.statusFormatted);
    formData.append('title', this.addForm.get('title').value);
    formData.append('url_image', this.fileSelected, this.fileSelected.name);

    this.categoryService.createCategory(formData)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['list-category']);
        },
        err => console.log(err)
      );
  }
}
