import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerServiceService } from '../customer-service.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-horeca-details',
  templateUrl: './horeca-details.component.html',
  styleUrls: ['./horeca-details.component.css']
})
export class HorecaDetailsComponent implements OnInit {
  appLanguage?: any;
	roasterId: any;
	hrContacts: any;
 
  constructor(public globals: GlobalsService,
    private route : ActivatedRoute,
    public customerService : CustomerServiceService,private userService:UserserviceService,public cookieService: CookieService,private toastrService : ToastrService) { 
      this.route.queryParams.subscribe(params => {
        this.customerService.horecaId = params['itemId'];
		this.customerService.hrcCustomerDetails();
		this.horecaEmployees();
		});
		this.roasterId = this.cookieService.get('roaster_id');
    }

  ngOnInit(): void {
    $('.btn-toggle').click(function () {
      $(this).find('.btn').toggleClass('active');
      $(this).find('.btn').toggleClass('active_default');
      $(this).find('.btn').toggleClass('disable_default');
    });
    this.appLanguage = this.globals.languageJson;

  }

  editHorecaDiscount(){
    document.getElementById("edithoreca-discount").style.display = "none";
    document.getElementById("savehoreca-discount").style.display = "block";
    }
    
	
	saveHorecaDiscount(){
		var  discountData = {
			discount_percentage :parseFloat(this.customerService.discount_percentage)
		}
		this.userService.updateHorecaDiscount(this.roasterId,this.customerService.horecaId,discountData).subscribe(
			res => {
				if(res['success'] == true){
					// this.customer.mrCustomerDetails();
					this.toastrService.success("Discount data updated sucessfully");
				}	
				else{
					this.toastrService.error("Error while updating discount data");
				}
			}
		);
		document.getElementById("edithoreca-discount").style.display = "block";
    	document.getElementById("savehoreca-discount").style.display = "none";
	}

	horecaEmployees(){
		this.userService.getHorecaContacts(this.customerService.horecaId).subscribe(res =>{
		  if(res['success']==true){
			this.hrContacts = res['result'];
			console.log(this.hrContacts);
		  }
		})
	  }
    ngAfterViewInit(){
      
    document.getElementById("savehoreca-discount").style.display = "none";
    }
}
