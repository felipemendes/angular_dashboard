import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError: boolean = false;
  loginErrorMessage: string;
  email: string;
  password: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) {}

  onSubmit() {
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(
      data => {
        this.router.navigate(['list-category']);
      },
      error => {
        this.loginError = true;
        this.loginErrorMessage = error.error.message;
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
