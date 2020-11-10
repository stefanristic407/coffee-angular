import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  public languageJson = {};
  public slug_list: any;
	public permissions:any={};

  constructor(private cookieService: CookieService
    ) {
	this.slug_list=JSON.parse(this.cookieService.get('permissionSlug'));
	this.slug_list.forEach(element => {
		this.permissions[element.slug]={
			manage: element.access_type == 'manage'? true: false,
			view: element.access_type == 'view'? true: false
		}
	});
	console.log(this.permissions);
   }

   checkItem(data,listkey=null){

		var slugType='';
		// console.log(this.slug_list);
		if(!listkey){
		const flag3=this.slug_list.filter(elememts=>elememts.slug == data)[0];
		let arr1=['manage','view'];
		if(flag3 && arr1.includes(flag3.access_type)){
			return true;
		}
		else{
			return false;
		}
		// for (var i = 0; i < this.slug_list.length; i++) {
		// 	if(this.slug_list[i].slug == data){
		// 	slugType =  this.slug_list[i].access_type;
		// 	return slugType;
		// 	}
		// }	
	}
	else{
		const flag1=this.slug_list.filter(elememt=>elememt.slug==data)[0];
		const flag2= this.slug_list.filter(element1=>element1.slug==data)[0];
		let arr=['manage','view'];
		if((flag1 && arr.includes(flag1.access_type)) || (flag2 && arr.includes(flag2.access_type))){
			return true;
		}
		else{
			return false;
		}
			// if(this.slug_list[i].slug == data){
			// slugType =  this.slug_list[i].access_type;
			// // console.log(slugType);
			// return slugType;
			// }
		
	}

	}
}
