import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
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
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  constructor(private token: TokenStorage, private router: Router, private breakpointObserver: BreakpointObserver) { 
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

  signOut(): void {
    this.token.signOut();
    this.router.navigate(['login']);
  }

  category(): void {
    this.router.navigate(['list-category']);
  };

  salePlace(): void {
    this.router.navigate(['list-sale-place']);
  };

}
