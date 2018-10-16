import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SalePlaceService } from "../service/salePlace.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-sale-place',
  templateUrl: './add-sale-place.component.html',
  styleUrls: ['./add-sale-place.component.css']
})
export class AddSalePlaceComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private salePlaceService: SalePlaceService) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      uuid: [],
      status: ['', Validators.required],
      title: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onSubmit() {
    this.salePlaceService.createSalePlace(this.addForm.value)
      .subscribe(
        () => {
          this.router.navigate(['list-sale-place']);
        },
        err => console.log(err)
      );
  }
}