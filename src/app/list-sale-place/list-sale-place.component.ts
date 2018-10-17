import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SalePlaceService } from "../service/salePlace.service";
import { SalePlace } from '../model/salePlace.model';

@Component({
  selector: 'app-list-sale-place',
  templateUrl: './list-sale-place.component.html',
  styleUrls: ['./list-sale-place.component.css']
})
export class ListSalePlaceComponent implements OnInit {

  salePlaces: SalePlace[];

  constructor(private router: Router, private salePlaceService: SalePlaceService) { }

  ngOnInit() {
    this.salePlaceService.getSalePlaces()
      .subscribe( data => {
        this.salePlaces = data["sale_places"];
      });
  }

  deleteSalePlace(salePlace: SalePlace): void {
    this.salePlaceService.deleteSalePlace(salePlace.uuid)
      .subscribe( () => {
        this.salePlaces = this.salePlaces.filter(u => u !== salePlace);
      })
  };

  editSalePlace(salePlace: SalePlace): void {
    localStorage.removeItem("editSalePlaceUuid");
    localStorage.setItem("editSalePlaceUuid", salePlace.uuid.toString());
    this.router.navigate(['edit-sale-place']);
  };

  addSalePlace(): void {
    this.router.navigate(['add-sale-place']);
  };

}
