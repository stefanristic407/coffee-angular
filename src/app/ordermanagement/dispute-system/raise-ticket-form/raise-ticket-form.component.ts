import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-raise-ticket-form',
  templateUrl: './raise-ticket-form.component.html',
  styleUrls: ['./raise-ticket-form.component.css']
})
export class RaiseTicketFormComponent implements OnInit {
  date3: Date;

  orderid : number;
  helpyou : string="";
  // orderDate : string;
  weight : number;
  locaionBean : string;
  cupScore : number;
  disputeOrder : string="";
  problem : string;
  solProblem : string;

  orderidError : string;
  helpYouError : string; 
  // orderDateError : string;
  weightError : string;
  locaionBeanError : string;
  cupScoreError : string;
  disputeOrderError : string;
  problemError : string;
  solProblemError : string;
  orderID:string='';
  roaster_id:string = '';
  orderDetails:any = {};
  ticketDetails:any= {};

  constructor(private route : ActivatedRoute, public roasterService:RoasterserviceService, 
    public cookieService: CookieService, public router: Router, private toastrService : ToastrService,) { 
    this.orderidError = '';
    this.helpYouError = ''; 
    // this.orderDateError = '';
    this.weightError = '';
    this.locaionBeanError = '';
    this.cupScoreError = '';
    this.disputeOrderError = '';
    this.problemError = '';
    this.solProblemError = '';
  }

  ngOnInit(): void {
    this.orderID = decodeURIComponent(this.route.snapshot.queryParams['id']);
    this.roaster_id = this.cookieService.get('roaster_id');
    this.getOrderDetails();
  }
  getOrderDetails(){
		this.roasterService.getViewOrderDetails(this.roaster_id, this.orderID).subscribe(res =>{
			console.log(res);
			if(res['success'] && res['result']){
				this.orderDetails = res['result'];
				if(this.orderDetails['status']){
					this.orderDetails['status'] = this.formatStatus(this.orderDetails['status']);
				}
				if(this.orderDetails['order_type']){
					this.orderDetails['order_type'] = this.formatStatus(this.orderDetails['order_type']);
				}
			}
		}, err =>{
			console.log(err);
		});
  }
  formatStatus(stringVal){
		let formatVal = '';
		if(stringVal){
			formatVal = stringVal.toLowerCase().charAt(0).toUpperCase() + stringVal.slice(1).toLowerCase();
			formatVal = formatVal.replace('_', ' ');
		}
		return formatVal.replace('-', '');
	}

  onKeyPress(event: any) {
    if (event.target.value == "") {
      document.getElementById(event.target.id).style.border = "1px solid #D50000";
    } else {
      document.getElementById(event.target.id).style.border = "1px solid #E8E8E8";
    }
  }

  submitTicket(){
    let validationflag = false;
    if (this.helpyou == "" || this.helpyou == null || this.helpyou == undefined) {
      this.helpYouError = "Please select any option";
      document.getElementById('helpYou').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.helpYouError = "";
      }, 3000);
      validationflag = true;
    }
    if (this.problem == "" ||this.problem == null || this.problem == undefined) {
      this.problemError = "Please describle your problem";
      validationflag = true;
      document.getElementById('problem').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.problemError = "";
      }, 3000);
    }
    if(!validationflag){
      let obj = {};
      obj['dispute_type'] = this.helpyou;
      obj['dispute_reason'] = this.disputeOrder;
      obj['description'] = this.problem;
      obj['solution'] = this.solProblem;
      this.roasterService.raiseTicket(this.roaster_id, this.orderID, obj).subscribe(res =>{
        console.log(res);
        if(res && res['success']){
          this.toastrService.success("Successfully raised a ticket");
          let navigationExtras: NavigationExtras = {
            queryParams: {
              id: this.orderID
            }
          };
          this.router.navigate(["/ordermanagement/order-chat"], navigationExtras);
        }
      }, err =>{
        console.log(err);
        this.toastrService.error("Error while raising a ticket");
      });
    }
  }

}
