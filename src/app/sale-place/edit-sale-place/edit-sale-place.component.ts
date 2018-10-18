import { Component, OnInit } from '@angular/core';
import { SalePlaceService } from "../../service/salePlace.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators}  from "@angular/forms";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-sale-place',
  templateUrl: './edit-sale-place.component.html',
  styleUrls: ['./edit-sale-place.component.min.css']
})
export class EditSalePlaceComponent implements OnInit {

  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private salePlaceService: SalePlaceService) { }

  ngOnInit() {
    let salePlaceUuid = localStorage.getItem("editSalePlaceUuid");
    let salePlaceStatus = localStorage.getItem("editSalePlaceStatus");

    if (!salePlaceUuid || !salePlaceStatus) {
      alert("Invalid action.")
      this.router.navigate(['list-sale-place']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],
      uuid: [],
      status: ['', Validators.required],
      title: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.salePlaceService.getSalePlaceByUuid(salePlaceUuid, parseInt(salePlaceStatus))
      .subscribe( data => {
        this.editForm.setValue(data["sale_places"][0]);
      });
  }

  onSubmit() {
    this.salePlaceService.updateSalePlace(this.editForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['list-sale-place']);
        },
        error => {
          alert(error);
        }
      );
  }

}
