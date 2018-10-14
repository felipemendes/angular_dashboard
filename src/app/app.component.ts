import { Component } from '@angular/core';
import { TokenStorage } from './core/token.storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'purai-angular-dashboard';

  constructor(private token: TokenStorage) { }

  ngOnInit() {
    this.token.checkToken();
  }

}
