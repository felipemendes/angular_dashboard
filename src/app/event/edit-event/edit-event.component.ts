import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import { EventService } from '../../service/event.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.min.css']
})
export class EditEventComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private eventService: EventService,
              private snackBar: MatSnackBar) { }

  baseUrl: string = environment.baseUrl;
  editForm: FormGroup;
  statusFormatted;
  fileSelected: File = null;

  ngOnInit() {
    const eventUuid = localStorage.getItem('editEventUuid');
    const eventStatus = localStorage.getItem('editEventStatus');

    if (!eventUuid) {
      this.snackBar.open('Invalid action.', 'Not nice');
      this.router.navigate(['list-event']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],
      uuid: [],
      status: ['', Validators.required],
      title: ['', Validators.required],
      url_image: [''],
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

    this.eventService.getEventByUuid(eventUuid, parseInt(eventStatus, 2))
      .subscribe(
        res => {
          this.editForm.setValue(res['events'][0]);
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

    formData.append('created_at', this.editForm.get('created_at').value);
    formData.append('updated_at', this.editForm.get('updated_at').value);
    formData.append('place', this.editForm.get('place').value);
    formData.append('place_phone', this.editForm.get('place_phone').value);
    formData.append('date', this.editForm.get('date').value);
    formData.append('address', this.editForm.get('address').value);
    formData.append('city', this.editForm.get('city').value);
    formData.append('id_category', this.editForm.get('id_category').value);
    formData.append('id_sale_place', this.editForm.get('id_sale_place').value);

    this.eventService.updateEvent(formData)
      .pipe(first())
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
