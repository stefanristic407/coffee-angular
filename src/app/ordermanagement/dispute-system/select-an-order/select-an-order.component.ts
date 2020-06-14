import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-select-an-order',
  templateUrl: './select-an-order.component.html',
  styleUrls: ['./select-an-order.component.css']
})
export class SelectAnOrderComponent implements OnInit {
  termStatus: any;
  termRole: any;
  termOrigin:any;
  isSelected:true;
  termDisplay:any= 5;
  selected: Date[];
  selectedMembers: any;


   // Static Select An Order Data List
   public data: any[] = [
    { orderid: '1000', estatename: 'Finca La Pampa', dataordered: '24 Jan 2020', origin: 'Colombia',species:'Bourbon',price:'-', quantity: '-', typeoforder: 'Sample', status: 'Shipped',cuppingscore:'84.5' },
    { orderid: '1001', estatename: 'Gesha', dataordered: '21 Jan 2020', origin: 'Ethopia',species:'Bourbon',price:'$1,480', quantity: '297kg', typeoforder: 'Booked', status: 'Shipped',cuppingscore:'88' },
    { orderid: '1002', estatename: 'Finca La Toboba', dataordered: '22 Apr 2020', origin: 'Ethopia',species:'Bourbon',price:'-', quantity: '29kg', typeoforder: 'Sample', status: 'Order Confirmed',cuppingscore:'81.5' },
    { orderid: '1003', estatename: 'Asoproaaa', dataordered: '24 Apr 2020', origin: 'Ethopia',species:'Bourbon',price:'$6,560', quantity: '-', typeoforder: 'Booked', status: 'Order Confirmed',cuppingscore:'84.5' },
    { orderid: '1004', estatename: 'Cafe Directo', dataordered: '25 May 2020', origin: 'Colombia',species:'Bourbon',price:'-', quantity: '-', typeoforder: 'Sample', status: 'Shipped',cuppingscore:'85.5' },
    { orderid: '1005', estatename: 'La Isabela', dataordered: '26 May 2020', origin: 'Colombia',species:'Bourbon',price:'-', quantity: '-', typeoforder: 'Booked', status: 'Shipped',cuppingscore:'86' },
  ];
  termType: any;
  constructor() { }
  @ViewChild('dateFilter') private dateFilter: any;


  ngOnInit(): void {
    this.termStatus = '';
    this.termRole = '';
    this.termOrigin = '';
    this.termType = '';
    this.selectedMembers = '';

  }
// Function Name : Status Filiter
  // Description: This function helps to filiter the users based on the selected status fiiter.

  setStatus(term: any) {
    this.termStatus = term;
  }

  // Function Name : Roles Filiter
  // Description: This function helps to filiter the users based on the selected roles fiiter. 

  setRole(term: any) {
    this.termRole = term;
  }
  
  setOrigin(data:any){
    this.termOrigin = data;
  }
  setType(data:any){
    this.termType = data;
  }
  setDisplay(term: any){
    this.termDisplay= term;
  }
  updateMyDate(newDate) {
    // console.log("start date"+this.selected[0]);
    // console.log("End date"+this.selected[1]);
   let start= new DatePipe('en-Us').transform(this.selected[0], 'd MMM y', 'GMT+5:30');
   console.log(start);
   let end= new DatePipe('en-Us').transform(this.selected[1], 'd MMM y', 'GMT+5:30');
   console.log(end);

   this.selectedMembers = this.data.filter(
    m => new Date(m.dataordered) >= new Date(start) && new Date(m.dataordered) <= new Date(end));
    console.log(this.selectedMembers);
    if (this.selected[1]) { // If second date is selected
      this.dateFilter.hideOverlay();
  };

}
  ngAfterViewInit(){
  //   $(".box").on("change", function() {
  //     $(this).parents("tr").toggleClass("highlight");
  //  });
//    $(".box").change(function(){
//     if($(this).is(":checked")){
//         $(this).parents("tr").addClass("highlight"); 
//     }else{
//         $(this).parents("tr").removeClass("highlight");  
//     }
// });
  }
 
}
