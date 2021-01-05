import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-coffee-sale',
  templateUrl: './coffee-sale.component.html',
  styleUrls: ['./coffee-sale.component.css']
})
export class CoffeeSaleComponent implements OnInit {
  appLanguage?: any;
  coffeeSaleActive:any =0;
  roaster_id:any='';
  orderDetails:any;
  orderID:any='';
  saleInformation:any = {};
  constructor(public globals: GlobalsService, public route: ActivatedRoute, 
    public roasterService:RoasterserviceService, public cookieService: CookieService, 
    private router: Router, private toastrService: ToastrService) {
      this.roaster_id = this.cookieService.get('roaster_id');
  }

  ngOnInit(): void {
    this.language();
    this.saleInformation['name'] = '';
    this.saleInformation['price'] = '';
    this.saleInformation['price_unit'] = 'per kg';
    this.saleInformation['quantity'] = '';
    this.saleInformation['quantity_type'] = 'per kg';
    this.saleInformation['minimum_purchase_quantity'] = '';
    this.saleInformation['vat_rate'] = '';
    this.getOrderDetails();
  }
  getOrderDetails(){
		this.orderID = decodeURIComponent(this.route.snapshot.queryParams['orderId']);
		this.roasterService.getProcuredCoffeeDetails(this.roaster_id, this.orderID).subscribe(
			response => {
			  console.log(response);
			  if(response['success'] && response['result']){
          this.orderDetails = response['result'];
          if(this.orderDetails && this.orderDetails['harvest_id']){
            this.getGCAvailableDetails(this.orderDetails['harvest_id']);
          }
			  }
			}, err =>{
			  console.log(err);
			}
		);	
  }
  getGCAvailableDetails(harvest_id){
		this.roasterService.getGCAvailableDetails(harvest_id).subscribe(
			response => {
				if(response && response['success'] && response['result']){
					const result = response['result']
					this.orderDetails['availability_name'] = result['name'];
					this.orderDetails['cup_score'] = result['cupping']['cup_score'];
					this.orderDetails['altitude'] = result['min_altitude'] + '-' + result['max_altitude'];
					this.orderDetails['flavour_profile'] = result['flavours'];
					this.orderDetails['wet_mill'] = result['wet_milling']['name'];
					this.orderDetails['processing'] = result['processing_types'];					
				}
			}, err =>{
			  console.log(err);
			}
		);
	}
  language(){
    this.appLanguage = this.globals.languageJson;
    this.coffeeSaleActive++;
  }
  createSale(){
    let data = this.saleInformation;
    this.roasterService.CreateMarkForSale(this.roaster_id, this.orderID, data).subscribe(
			response => {
			  console.log(response);
			  if(response && response['success']){
          this.toastrService.success("Created a request");
          this.router.navigate(["/features/green-coffee-inventory"]);
        }
			}, err =>{
        this.toastrService.success("Failed to create a request");
			  console.log(err);
			}
		);	
  }
}
