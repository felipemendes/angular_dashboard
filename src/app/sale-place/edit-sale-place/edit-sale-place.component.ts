import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SalePlaceService } from '../../service/salePlace.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-sale-place',
  templateUrl: './edit-sale-place.component.html',
  styleUrls: ['./edit-sale-place.component.min.css']
})
export class EditSalePlaceComponent implements OnInit {

  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private salePlaceService: SalePlaceService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    const salePlaceUuid = localStorage.getItem('editSalePlaceUuid');
    const salePlaceStatus = localStorage.getItem('editSalePlaceStatus');

    if (!salePlaceUuid || !salePlaceStatus) {
      this.snackBar.open('Invalid action.', 'Not nice');
      this.router.navigate(['list-sale-place']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],
      uuid: [],
      status: ['', Validators.required],
      title: ['', Validators.required],
      phone: ['']
    });

    this.salePlaceService.getSalePlaceByUuid(salePlaceUuid, parseInt(salePlaceStatus, 2))
      .subscribe(
        res => {
          this.editForm.setValue(res['sale_places'][0]);
        },
        err => {
          this.snackBar.open(err, 'Not nice');
        }
      );
  }

  onSubmit() {
    if (this.editForm.invalid) {
      this.snackBar.open('Invalid form. Try again', 'Okay');
      return;
    }

    this.salePlaceService.updateSalePlace(this.editForm.value)
      .pipe(first())
      .subscribe(
        res => {
          this.snackBar.open(res['message'], 'Nice');
          this.router.navigate(['list-sale-place']);
        },
        err => {
          this.snackBar.open(err, 'Not nice');
        }
      );
  }

}
