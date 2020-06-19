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
  displayNumbers: any;
  selected: Date[];

  // Static Estate Orders Data List
  public data: any[] = [
    { orderid: '1000', estatename: 'Finca La Pampa', dataordered: '24 Jan 2020', origin: 'Colombia', quantity: '-', typeoforder: 'Sample', status: 'Shipped',species:'Bourbon',price:'-' },
    { orderid: '1001', estatename: 'Gesha', dataordered: '21 Jan 2020', origin: 'Ethopia', quantity: '297kg', typeoforder: 'Booked', status: 'Shipped',species:'Bourbon',price:'-' },
    { orderid: '1002', estatename: 'Finca La Toboba', dataordered: '22 Apr 2020', origin: 'Ethopia', quantity: '29kg', typeoforder: 'Booked', status: 'Order confirmed',species:'Bourbon',price:'$1,480' },
    { orderid: '1003', estatename: 'Asoproaaa', dataordered: '24 Apr 2020', origin: 'Ethopia', quantity: '-', typeoforder: 'Booked', status: 'Order confirmed',species:'Bourbon',price:'-' },
    { orderid: '1004', estatename: 'Cafe Directo', dataordered: '25 May 2020', origin: 'Colombia', quantity: '-', typeoforder: 'Pre-Booked', status: 'Payment',species:'Bourbon',price:'$1,480' },
    { orderid: '1005', estatename: 'La Isabela', dataordered: '26 May 2020', origin: 'Colombia', quantity: '-', typeoforder: 'Pre-Booked', status: 'In transit',species:'Bourbon',price:'-' },
    { orderid: '1006', estatename: 'La Isabela', dataordered: '13 Oct 2020', origin: 'Colombia', quantity: '397kg', typeoforder: 'Sample', status: 'Order confirmed',species:'Bourbon',price:'$6,560' },
    { orderid: '1007', estatename: 'Cafe Directo', dataordered: '13 Dec 2020', origin: 'Ethopia', quantity: '297kg', typeoforder: 'Sample', status: 'Shipped',species:'Bourbon',price:'-' },
    { orderid: '1008', estatename: 'Asoproaaa', dataordered: '13 Jan 2019', origin: 'Colombia', quantity: '-', typeoforder: 'Pre-Booked', status: 'Harvest Ready',species:'Bourbon',price:'-' },
    { orderid: '1009', estatename: 'Finca La Toboba', dataordered: '14 Feb 2019', origin: 'Colombia', quantity: '-', typeoforder: 'Pre-Booked', status: 'Payment',species:'Bourbon',price:'$3,200' },
    { orderid: '1010', estatename: 'Gesha', dataordered: '14 Jun 2019', origin: 'Ethopia', quantity: '297kg', typeoforder: 'Pre-Booked', status: 'In transit',species:'Bourbon',price:'-' },
    { orderid: '1011', estatename: 'Finca La Pampa', dataordered: '13 Jul 2019', origin: 'Ethopia', quantity: '197kg', typeoforder: 'Booked', status: 'Order confirmed',species:'Bourbon',price:'$2,377' },
    { orderid: '1012', estatename: 'Finca La Pampa', dataordered: '13 Mar 2018', origin: 'Colombia', quantity: '257kg', typeoforder: 'Booked', status: 'Cancelled',species:'Bourbon',price:'-' },
    { orderid: '1013', estatename: 'Gesha', dataordered: '13 May 2018', origin: 'Colombia', quantity: '277kg', typeoforder: 'Booked', status: 'Received',species:'Bourbon',price:'$2,377' },
    { orderid: '1014', estatename: 'Finca La Toboba', dataordered: '17 Aug 2018', origin: 'Ethopia', quantity: '-', typeoforder: 'Booked', status: 'Cancelled',species:'Bourbon',price:'$6,560' },
    { orderid: '1015', estatename: 'Asoproaaa', dataordered: '13 Oct 2018', origin: 'Ethopia', quantity: '-', typeoforder: 'Sample', status: 'Received',species:'Bourbon',price:'$3,200' },
    { orderid: '1016', estatename: 'Finca La Toboba', dataordered: '19 Oct 2018', origin: 'Colombia', quantity: '297kg', typeoforder: 'Sample', status: 'Payment',species:'Bourbon',price:'-' },
    { orderid: '1017', estatename: 'Finca La Pampa', dataordered: '23 Nov 2018', origin: 'Colombia', quantity: '-', typeoforder: 'Booked', status: 'Cancelled',species:'Bourbon',price:'$3,200' },

  ];
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {
    language : {"search" : ''}
  };

  // dtOptions: DataTables.SearchSettings = {
  //   search: '',
  //   searchPlaceholder: "Search by order id, estate name",
  // }

  constructor(public router: Router,
              public cookieService : CookieService) { }

  ngOnInit(): void {
     //Auth checking
     if (this.cookieService.get("Auth") == "") {
      this.router.navigate(["/auth/login"]);
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
      processing: true,
    };
    this.estatetermStatus = '';
    this.estatetermOrigin = '';
    this.estatetermType = '';
    this.displayNumbers = '10';

    $(document).ready(function(){
      
      $( ".dataTables_length" ).ready(function(){
        $(".dataTables_length").hide()
      });
      $("input[type='search']").ready(function(){
        $("input[type='search']").attr("placeholder", "Search by order id, estate name");
      });
      $(".dataTables_filter").ready(function(){
        $(".dataTables_filter").html('<label><input type="search" class="" placeholder="Search by order id, estate name" aria-controls="DataTables_Table_0"></label>');
      });
  
    });
  }

  // checkAllEstate(ev) {
  //   this.data.forEach(x => x.state = ev.target.checked)
  // }

  // isAllCheckedEstate() {
  //   return this.data.every(_ => _.state);
  // }
  //  Function Name : Check box function.
	//  Description   : This function helps to Check all the rows of the Users list.
	checkAllEstate(ev) {
		this.data.forEach(x => (x.state = ev.target.checked));
	}

	//  Function Name : Single Check box function.
	//  Description   : This function helps to Check that single row isChecked.
	isAllCheckedEstate() {
		return this.data.every(_ => _.state);
	}

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
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true
    // };
    //this.applyDataFIlters();
    
  }
  setType(data:any){
    this.estatetermType = data;
  }
  setDisplay(data: any){
    this.displayNumbers = data;
    $("select").val(data).trigger('change');
    
  }
  // applyDataFIlters(){
  //   if(this.estatetermOrigin != ''){
  //     let filterArray=[];
  //   }
  // }

}
