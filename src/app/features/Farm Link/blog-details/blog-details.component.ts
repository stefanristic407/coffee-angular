import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  backValue: any;
  appLanguage: any;
	blogDetailsActive:any = 0;
  constructor(private router : Router,
    private globals: GlobalsService) { }

  ngOnInit(): void {
	// this.appLanguage = this.globals.languageJson;
	this.language();
  }

  language(){
	this.appLanguage = this.globals.languageJson;
	this.blogDetailsActive++;
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
