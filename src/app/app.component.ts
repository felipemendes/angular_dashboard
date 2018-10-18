import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { TokenStorage } from './core/token.storage';
import { CategoryService } from './service/category.service';
import { SalePlaceService } from './service/salePlace.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.min.css']
})
export class AppComponent {

  showHeader = false;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  countCategories = 0;
  countSalePlaces = 0;

  constructor(private token: TokenStorage,
              private router: Router,
              private breakpointObserver: BreakpointObserver,
              private categoryService: CategoryService,
              private salePlaceService: SalePlaceService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] === '/login') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });
  }

  ngOnInit() {
    this.token.checkToken();

    this.categoryService.getCategories()
      .subscribe( data => {
        this.countCategories = data['categories'].length;
      });

    this.salePlaceService.getSalePlaces()
      .subscribe( data => {
        this.countSalePlaces = data['sale_places'].length;
      });

  }

  signOut(): void {
    this.token.signOut();
    this.router.navigate(['login']);
  }

  category(): void {
    this.router.navigate(['list-category']);
  }

  salePlace(): void {
    this.router.navigate(['list-sale-place']);
  }

}
