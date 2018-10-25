import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.min.css']
})
export class EditUserComponent implements OnInit {

  editForm: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    const userUuid = localStorage.getItem('editUserUuid');
    const userStatus = localStorage.getItem('editUserStatus');

    if (!userUuid || !userStatus) {
      this.snackBar.open('Invalid action.', 'Not nice');
      this.router.navigate(['list-user']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],
      uuid: [],
      status: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: []
    });

    this.userService.getUserByUuid(userUuid, parseInt(userStatus, 2))
      .subscribe(
        res => {
          this.editForm.setValue(res['users'][0]);
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

    this.userService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        res => {
          this.snackBar.open(res['message'], 'Nice');
          this.router.navigate(['list-user']);
        },
        err => {
          this.snackBar.open(err, 'Not nice');
        }
      );
  }

}
