import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { EventService } from '../../service/event.service';
import { Category } from '../../model/category.model';
import { CategoryService } from '../../service/category.service';
import { SalePlace } from '../../model/salePlace.model';
import { SalePlaceService } from '../../service/salePlace.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.min.css']
})

export class AddEventComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private eventService: EventService,
              private categoryService: CategoryService,
              private salePlaceService: SalePlaceService) { }

  statusFormatted;
  addForm: FormGroup;
  fileSelected: File = null;
  categories: Category[];
  salePlaces: SalePlace[];

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      uuid: [],
      status: ['', Validators.required],
      title: ['', Validators.required],
      url_image: ['', Validators.required],
      created_at: [],
      updated_at: [],
      place: ['', Validators.required],
      place_phone: ['', Validators.required],
      date: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      id_category: ['', Validators.required],
      id_sale_place: ['', Validators.required]
    });

    this.loadCategories();
    this.loadSalePlaces();
  }

  onFileSelected(event) {
    this.fileSelected = <File>event.target.files[0];
    this.addForm.get('url_image').setValue(this.fileSelected, this.fileSelected.name);
  }

  loadCategories() {
    this.categoryService.getCategories(1, 0)
      .subscribe(
        res => {
          this.categories = res['categories'];
        },
        () => {
          this.snackBar.open('Could not load categories. Check server.', 'Okay');
        }
      );
  }

  loadSalePlaces() {
    this.salePlaceService.getSalePlaces(1, 0)
      .subscribe(
        res => {
          this.salePlaces = res['sale_places'];
        },
        () => {
          this.snackBar.open('Could not load sale places. Check server.', 'Okay');
        }
      );
  }

  onSubmit() {
    if (this.addForm.invalid) {
      console.log(this.addForm.value);
      this.snackBar.open('Invalid form. Try again', 'Okay');
      return;
    }

    this.statusFormatted = this.addForm.get('status').value === true ? '1' : '0';

    const formData = new FormData();
    formData.append('status', this.statusFormatted);
    formData.append('title', this.addForm.get('title').value);
    formData.append('url_image', this.fileSelected, this.fileSelected.name);
    formData.append('created_at', this.addForm.get('created_at').value);
    formData.append('updated_at', this.addForm.get('updated_at').value);
    formData.append('place', this.addForm.get('place').value);
    formData.append('place_phone', this.addForm.get('place_phone').value);
    formData.append('date', this.addForm.get('date').value);
    formData.append('address', this.addForm.get('address').value);
    formData.append('city', this.addForm.get('city').value);
    formData.append('id_category', this.addForm.get('id_category').value);
    formData.append('id_sale_place', this.addForm.get('id_sale_place').value);

    this.eventService.createEvent(formData)
      .subscribe(
        res => {
          this.snackBar.open(res['message'], 'Nice');
          this.router.navigate(['list-event']);
        },
        err => {
          this.snackBar.open(err, 'Not nice');
        }
      );
  }
}
