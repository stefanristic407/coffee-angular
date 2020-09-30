import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  backValue: any;

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  back() {
    this.backValue = true;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "data": encodeURIComponent(this.backValue),
      }
    }

    this.router.navigate(['/features/social-media'], navigationExtras);
  }

}
