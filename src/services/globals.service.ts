import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  public languageJson = {};
  public slug_list: any;

  constructor(private cookieService: CookieService
    ) {
    this.slug_list=JSON.parse(this.cookieService.get('permissionSlug'));
   }

   checkItem(data){
		var slugType='';
		// console.log(this.slug_list);
		for (var i = 0; i < this.slug_list.length; i++) {
			if(this.slug_list[i].slug == data){
			slugType =  this.slug_list[i].access_type;
			// console.log(slugType);
			return slugType;
			}
		}	
	}
}
