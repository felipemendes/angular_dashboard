import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TokenStorage } from '../core/token.storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private token: TokenStorage) { }

  ngOnInit() {
  }

  signOut(): void {
    this.token.signOut();
    this.router.navigate(['login']);
  }

}
