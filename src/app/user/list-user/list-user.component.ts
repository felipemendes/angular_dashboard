import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteConfirmDialogComponent } from '../../shared/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.min.css']
})
export class ListUserComponent implements OnInit {

  users: User[];
  currentPage = 0;

  constructor(private router: Router,
              private userService: UserService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.currentPage ++;
    this.loadUsers();
  }

  loadUsers(status = 1) {
    this.userService.getUsers(status)
      .subscribe(
        res => {
          this.users = res['users'];
        },
        () => {
          this.snackBar.open('Could not load data. Check server.', 'Okay');
        }
      );
  }

  deleteUser(user: User): void {
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
        this.userService.deleteUser(user.uuid)
        .subscribe(
          res => {
            this.snackBar.open(res['message'], 'Nice');
            this.users = this.users.filter(u => u !== user);
          },
          err => {
            this.snackBar.open('Check server: ' + err, 'Okay');
          }
        );
      }
    });
  }

  editUser(user: User): void {
    localStorage.removeItem('editUserUuid');
    localStorage.setItem('editUserUuid', user.uuid.toString());

    localStorage.removeItem('editUserStatus');
    localStorage.setItem('editUserStatus', user.status.toString());

    this.router.navigate(['edit-user']);
  }

  addUser(): void {
    this.router.navigate(['add-user']);
  }

  showInactives(): void {
    this.loadUsers(0);
  }

}
