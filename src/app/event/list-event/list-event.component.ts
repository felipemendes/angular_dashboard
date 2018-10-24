import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { EventService } from '../../service/event.service';
import { Event } from '../../model/event.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteConfirmDialogComponent } from '../../shared/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.min.css']
})
export class ListEventComponent implements OnInit {

  events: Event[];
  currentPage = 0;

  constructor(private router: Router,
              private eventService: EventService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.currentPage ++;
    this.loadEvents();
  }

  loadEvents(status = 1) {
    this.eventService.getEvents(status, 10, this.currentPage)
      .subscribe(
        res => {
          this.events = res['events'];
        },
        () => {
          this.snackBar.open('Could not load data. Check server.', 'Okay');
        }
      );
  }

  olderPage() {
    this.currentPage --;
    this.loadEvents();
  }

  newerPage() {
    this.currentPage ++;
    this.loadEvents();
  }

  deleteEvent(event: Event): void {
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
        this.eventService.deleteEvent(event.uuid)
        .subscribe(
          res => {
            this.snackBar.open(res['message'], 'Nice');
            this.events = this.events.filter(u => u !== event);
          },
          err => {
            this.snackBar.open('Check server: ' + err, 'Okay');
          }
        );
      }
    });
  }

  editEvent(event: Event): void {
    localStorage.removeItem('editEventUuid');
    localStorage.setItem('editEventUuid', event.uuid.toString());

    localStorage.removeItem('editEventStatus');
    localStorage.setItem('editEventStatus', event.status.toString());

    this.router.navigate(['edit-event']);
  }

  addEvent(): void {
    this.router.navigate(['add-event']);
  }

  showInactives(): void {
    this.loadEvents(0);
  }

}
