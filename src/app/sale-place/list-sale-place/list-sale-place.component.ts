import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SalePlaceService } from '../../service/salePlace.service';
import { SalePlace } from '../../model/salePlace.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteConfirmDialogComponent } from '../../shared/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-list-sale-place',
  templateUrl: './list-sale-place.component.html',
  styleUrls: ['./list-sale-place.component.min.css']
})
export class ListSalePlaceComponent implements OnInit {

  salePlaces: SalePlace[];
  currentPage = 0;

  constructor(private router: Router,
              private salePlaceService: SalePlaceService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.currentPage ++;
    this.loadSalePlaces();
  }

  loadSalePlaces(status = 1) {
    this.salePlaceService.getSalePlaces(status, 10, this.currentPage)
      .subscribe(
        res => {
          this.salePlaces = res['sale_places'];
        },
        () => {
          this.snackBar.open('Could not load data. Check server.', 'Okay');
        }
      );
  }

  olderPage() {
    this.currentPage --;
    this.loadSalePlaces();
  }

  newerPage() {
    this.currentPage ++;
    this.loadSalePlaces();
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
      if (result === true) {
        this.salePlaceService.deleteSalePlace(salePlace.uuid)
          .subscribe(
            res => {
              this.snackBar.open(res['message'], 'Nice');
              this.salePlaces = this.salePlaces.filter(u => u !== salePlace);
          },
          err => {
            this.snackBar.open('Check server: ' + err, 'Okay');
          }
        );
      }
    });

  }

  editSalePlace(salePlace: SalePlace): void {
    localStorage.removeItem('editSalePlaceUuid');
    localStorage.setItem('editSalePlaceUuid', salePlace.uuid.toString());

    localStorage.removeItem('editSalePlaceStatus');
    localStorage.setItem('editSalePlaceStatus', salePlace.status.toString());

    this.router.navigate(['edit-sale-place']);
  }

  addSalePlace(): void {
    this.router.navigate(['add-sale-place']);
  }

  showInactives(): void {
    this.loadSalePlaces(0);
  }

}
