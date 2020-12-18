import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { element } from 'protractor';
import { UserserviceService } from './users/userservice.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  	public languageJson : any;
  	public slug_list: any;
	public permissions:any={};
	roaster_id: string;
	permissionList: any;
	menuSearch: any;
	public selected_order_id : any;
	public ord_received_date : any;
	public userInvitesArray : any = [];

  	constructor(private cookieService: CookieService,	private userService: UserserviceService) {
		this.roaster_id = this.cookieService.get('roaster_id');
		// console.log(this.permissions);
		this.menuSearch = {'Sourcing Module' : '/features/sourcing',
			'Dashboard' : '/features/welcome-aboard',
			'Estate Orders' : '/ordermanagement/estate-orders',
			'Micro Roaster Orders' : '/ordermanagement/microroaster-orders',
			'Inventory' : '/features/green-coffee-inventory',
			'E-Commerce' : '/features/roasted-coffee-batch',
			'Brand Profile' : '/features/brand-profile',
			'File Share' : '/features/file-share',
			'Aggreements' : '/features/agreement',
			'Q and A Forum' : '/features/q-a-forum',
			'Social Media Posts' : '/features/social-media',
			'Manage Roles' : '/people/manage-role',
			'User Management' : '/people/user-management',
			'Customer Management' : '/people/customer-management',
			'Roaster Profile' : '/features/roastery-profile',
			'My Profile' : '/features/myprofile',
			'Account Settings' : '/features/account-settings'
		};
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
	
	permissionMethod(){
		this.slug_list=JSON.parse(this.cookieService.get('permissionSlug'));
		this.slug_list.forEach(element => {
			this.permissions[element.slug]={
				manage: element.access_type == 'manage'? true: false,
				view: element.access_type == 'view'? true: false
			}
		});
	}

	countTheString(value : any, count : any){
		let stringData = value;
		stringData = stringData.replace(/(^\s*)|(\s*$)/gi,"");
		stringData = stringData.replace(/[ ]{2,}/gi," ");
		stringData = stringData.replace(/\n /,"\n");
		if(stringData == ""){
		  return 0;
		}else{
		  const outputLength = stringData.split(' ').length;
		  if(outputLength > count){
			value = stringData.split(' ').splice(outputLength - 1,1).join(" ");
			return outputLength - 1;
		  }
		  return outputLength;
		  
		}
		
	  }
	
	  getTheMaxLength(value : any , countValue : any){
		const getLength = this.countTheString(value,countValue);
		return getLength == countValue ? value.length : "";
	  }
}
