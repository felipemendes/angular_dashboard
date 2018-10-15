import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { TokenStorage } from './core/token.storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'purai-angular-dashboard';
  showHeader: boolean = false;

  constructor(private token: TokenStorage, private router: Router) { 
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });
  }

  ngOnInit() {
    this.token.checkToken();
  }

}
