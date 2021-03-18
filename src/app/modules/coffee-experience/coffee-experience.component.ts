import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-coffee-experience',
  templateUrl: './coffee-experience.component.html',
  styleUrls: ['./coffee-experience.component.scss']
})
export class CoffeeExperienceComponent implements OnInit {
  items = [
    { label: 'Home', routerLink: '/features/welcome-aboard' },
    { label: 'Farm link' },
    { label: 'The Coffee Experience' },
  ];
  searchQuery = '';

  constructor(
      public globals: GlobalsService,
      public cookieService: CookieService,
  ) { }

  ngOnInit(): void {
  }

  onChangeSearchQuery(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }
}
