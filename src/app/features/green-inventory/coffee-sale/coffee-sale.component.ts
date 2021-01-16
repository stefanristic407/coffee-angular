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
  lotSaleActive: any = 0;
  roaster_id: any = '';
  orderDetails: any;
  orderID: any = '';
  saleInformation: any = {};
  showDropdown: boolean = false;
  order_status: string = 'IN_STOCK';
  status_label: string = 'In stock';
  saleDetailsPresent: boolean = false;

  constructor(public globals: GlobalsService, public route: ActivatedRoute,
    public roasterService: RoasterserviceService, public cookieService: CookieService, private router: Router,
    private toasterService: ToastrService) {
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
    this.getProcuredOrderDetails();
  }
  language() {
    this.appLanguage = this.globals.languageJson;
    this.lotSaleActive++;
  }
  formatStatus(stringVal) {
    let formatVal = '';
    if (stringVal) {
      formatVal = stringVal.toLowerCase().charAt(0).toUpperCase() + stringVal.slice(1).toLowerCase();
      formatVal = formatVal.replace('_', ' ');
    }
    return formatVal.replace('-', '');
  }
  getProcuredOrderDetails() {
    this.orderID = decodeURIComponent(this.route.snapshot.queryParams['orderId']);
    this.roasterService.getProcuredCoffeeDetails(this.roaster_id, this.orderID).subscribe(
      response => {
        console.log(response);
        if (response['success'] && response['result']) {
          this.orderDetails = response['result'];
        }
      }, err => {
        console.log(err);
      }
    );
  }
  createMarkForSale() {
    let data = this.saleInformation;
    data['order_id'] = undefined;
    data['initial_quantity'] = undefined;
    data['quantity_count'] = undefined;
    data['roaster_id'] = undefined;
    data['status'] = undefined;
    this.roasterService.CreateMarkForSale(this.roaster_id, this.orderID, data).subscribe(
      response => {
        console.log(response);
        if (response && response['success']) {
          this.toasterService.success("Successfully marked the sale");
          this.router.navigate(["/features/green-coffee-inventory"]);
        }
        if (response && !response['success'] && response['messages'] && response['messages']['sale_data'] && response['messages']['sale_data'][0]) {
          this.toasterService.error("Sale data already exists.");
        } else {
          this.toasterService.error("Error while updating mark for sale");
        }
      }, err => {
        console.log(err);
      }
    );
  }
  updateStatus() {
    let status = { "status": this.order_status }
    this.roasterService.updateMarkForSaleStatus(this.roaster_id, this.orderID, status).subscribe(
      response => {
        if (response && response['success']) {
          this.toasterService.success("Status updated successfully");
          this.showDropdown = false;
          this.status_label = this.formatStatus(this.order_status);
        }
      }, err => {
        this.toasterService.error("Error while updating status");
        console.log(err);
      }
    );
  }
}
