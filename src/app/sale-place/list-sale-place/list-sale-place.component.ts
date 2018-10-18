import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SalePlaceService } from "../../service/salePlace.service";
import { SalePlace } from '../../model/salePlace.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteConfirmDialogComponent } from '../../shared/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-list-sale-place',
  templateUrl: './list-sale-place.component.html',
  styleUrls: ['./list-sale-place.component.css']
})
export class ListSalePlaceComponent implements OnInit {

  salePlaces: SalePlace[];

  constructor(private router: Router, private salePlaceService: SalePlaceService, private dialog: MatDialog) { }

  ngOnInit() {
    this.salePlaceService.getSalePlaces()
      .subscribe( data => {
        this.salePlaces = data["sale_places"];
      });
  }

  deleteSalePlace(salePlace: SalePlace): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        title: 'Are you sure you want to delete it?',
        content: ''
    };

    const dialogReference = this.dialog.open(DeleteConfirmDialogComponent, dialogConfig);
    dialogReference.afterClosed().subscribe(result => {
      if (result == true) {
        this.salePlaceService.deleteSalePlace(salePlace.uuid)
          .subscribe( () => {
            this.salePlaces = this.salePlaces.filter(u => u !== salePlace);
          })
      }
    });
    
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
