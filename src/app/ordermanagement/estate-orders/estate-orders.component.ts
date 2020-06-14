// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Estate Orders List,Search and Filters.
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-estate-orders',
  templateUrl: './estate-orders.component.html',
  styleUrls: ['./estate-orders.component.css']
})
export class EstateOrdersComponent implements OnInit {
  estateterm: any;
  estatetermStatus: any;
  estatetermType: any;
  estatetermOrigin:any;

  // Static Estate Orders Data List
  public data: any[] = [
    { orderid: '1000', estatename: 'Finca La Pampa', dataordered: '24 Jan 2020', origin: 'Colombia', quantity: '-', typeoforder: 'Sample', status: 'Shipped' },
    { orderid: '1001', estatename: 'Gesha', dataordered: '21 Jan 2020', origin: 'Ethopia', quantity: '297kg', typeoforder: 'Booked', status: 'Shipped' },
    { orderid: '1002', estatename: 'Finca La Toboba', dataordered: '22 Apr 2020', origin: 'Ethopia', quantity: '29kg', typeoforder: 'Booked', status: 'Order Confirmed' },
    { orderid: '1003', estatename: 'Asoproaaa', dataordered: '24 Apr 2020', origin: 'Ethopia', quantity: '-', typeoforder: 'Booked', status: 'Order Confirmed' },
    { orderid: '1004', estatename: 'Cafe Directo', dataordered: '25 May 2020', origin: 'Colombia', quantity: '-', typeoforder: 'Pre-Booked', status: 'Payment' },
    { orderid: '1005', estatename: 'La Isabela', dataordered: '26 May 2020', origin: 'Colombia', quantity: '-', typeoforder: 'Pre-Booked', status: 'Payment' },
    { orderid: '1006', estatename: 'La Isabela', dataordered: '13 Oct 2020', origin: 'Colombia', quantity: '397kg', typeoforder: 'Sample', status: 'Order Confirmed' },
    { orderid: '1007', estatename: 'Cafe Directo', dataordered: '13 Dec 2020', origin: 'Ethopia', quantity: '297kg', typeoforder: 'Sample', status: 'Shipped' },
    { orderid: '1008', estatename: 'Asoproaaa', dataordered: '13 Jan 2019', origin: 'Colombia', quantity: '-', typeoforder: 'Pre-Booked', status: 'Harvest Ready' },
    { orderid: '1009', estatename: 'Finca La Toboba', dataordered: '14 Feb 2019', origin: 'Colombia', quantity: '-', typeoforder: 'Pre-Booked', status: 'Payment' },
    { orderid: '1010', estatename: 'Gesha', dataordered: '14 Jun 2019', origin: 'Ethopia', quantity: '297kg', typeoforder: 'Pre-Booked', status: 'Harvest Ready' },
    { orderid: '1011', estatename: 'Finca La Pampa', dataordered: '13 Jul 2019', origin: 'Ethopia', quantity: '197kg', typeoforder: 'Booked', status: 'Order Confirmed' },
    { orderid: '1012', estatename: 'Finca La Pampa', dataordered: '13 Mar 2018', origin: 'Colombia', quantity: '257kg', typeoforder: 'Booked', status: 'Order Confirmed' },
    { orderid: '1013', estatename: 'Gesha', dataordered: '13 May 2018', origin: 'Colombia', quantity: '277kg', typeoforder: 'Booked', status: 'Received' },
    { orderid: '1014', estatename: 'Finca La Toboba', dataordered: '17 Aug 2018', origin: 'Ethopia', quantity: '-', typeoforder: 'Booked', status: 'Shipped' },
    { orderid: '1015', estatename: 'Asoproaaa', dataordered: '13 Oct 2018', origin: 'Ethopia', quantity: '-', typeoforder: 'Sample', status: 'Received' },
    { orderid: '1016', estatename: 'Finca La Toboba', dataordered: '19 Oct 2018', origin: 'Colombia', quantity: '297kg', typeoforder: 'Sample', status: 'Payment' },
    { orderid: '1017', estatename: 'Finca La Pampa', dataordered: '23 Nov 2018', origin: 'Colombia', quantity: '-', typeoforder: 'Booked', status: 'Shipped' },

  ];
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};

  constructor(public router: Router,
              public cookieService : CookieService) { }

  ngOnInit(): void {
     //Auth checking
     if (this.cookieService.get("Auth") == "") {
      this.router.navigate(["/auth/login"]);
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.estatetermStatus = '';
    this.estatetermOrigin = '';
    this.estatetermType = '';
  }

  // checkAllEstate(ev) {
  //   this.data.forEach(x => x.state = ev.target.checked)
  // }

  // isAllCheckedEstate() {
  //   return this.data.every(_ => _.state);
  // }

  //  Function Name : Orders Redirection function.
  //  Description   : This function helps to redirect to the particular Order Management Page with selected status as Route Params.
  displayData($event, group) {
    console.log("the incoming data  are " + group.typeoforder + "..." + group.status);


    let navigationExtras: NavigationExtras = {
      queryParams: {
        "data": encodeURIComponent(group.status),
      }
    }
    if (group.typeoforder == "Booked") {
      this.router.navigate(["/ordermanagement/order-booked"], navigationExtras);
    }
    else if (group.typeoforder == "Sample") {
      this.router.navigate(["/ordermanagement/order-sample"], navigationExtras);
    }
    else if (group.typeoforder == "Pre-Booked") {
      this.router.navigate(["/ordermanagement/order-prebook"], navigationExtras);
    }

  }
  setStatus(term: any) {
    this.estatetermStatus = term;
  }

  setOrigin(data:any){
    this.estatetermOrigin = data;
  }
  setType(data:any){
    this.estatetermType = data;
  }

}
