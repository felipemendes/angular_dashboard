import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.min.css']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private snackBar: MatSnackBar) { }

  addForm: FormGroup;
  hide = true;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      uuid: [],
      status: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addForm.invalid) {
      this.snackBar.open('Invalid form. Try again', 'Okay');
      return;
    }

    this.userService.createUser(this.addForm.value)
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
