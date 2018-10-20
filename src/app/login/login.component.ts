import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.min.css'],
  encapsulation: ViewEncapsulation.None,
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginErrorMessage: string;
  email: string;
  password: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthenticationService,
              public snackBar: MatSnackBar) {}

  onSubmit() {
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(
      () => {
        this.router.navigate(['list-category']);
      },
      err => {
        this.snackBar.open(err.error.message, 'Not nice');
      }
    );
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
