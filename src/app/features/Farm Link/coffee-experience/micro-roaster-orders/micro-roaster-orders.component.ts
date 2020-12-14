import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-micro-roaster-orders',
  templateUrl: './micro-roaster-orders.component.html',
  styleUrls: ['./micro-roaster-orders.component.css']
})
export class MicroRoasterOrdersComponent implements OnInit {

  termStatus: any;
  showStatus: boolean = true;
  
  display:any;
  showDisplay:boolean = true;
  appLanguage?: any;

  mainData:any[] = [
    { order_id: '12174', customer_name: 'Finca La Pampa', origin: 'Colombia', date_ordered: '24 Jan 2020',  variety: 'Bourborn',quantity : '120kg', cup_Score: '84.5' },
    { order_id: '56076', customer_name: 'Gesha', origin: 'Colombia', date_ordered: '12 Jan 2020', variety: 'Bourborn',quantity : '120kg', cup_Score: '88'},
    {  order_id: '46930', customer_name: 'Finca La Toboba', origin: 'Ethiopia', date_ordered: '13 Oct 2018', variety: 'Bourborn',quantity : '120kg', cup_Score: '81.5' },
    {   order_id: '9019', customer_name: 'Asopraaaa', origin: 'Brazil', date_ordered: '02 Dec 2019', variety: 'Bourborn',quantity : '120kg', cup_Score: '85.4'},
    { order_id: '12416', customer_name: 'Cafe Directo', origin: 'Ethiopia',  date_ordered: '03 Oct 2018', variety: 'Bourborn',quantity : '120kg', cup_Score: '82' },
    {  order_id: '71716', customer_name: 'La Isabela', origin: 'Colombia',  date_ordered: '19 Sep 2019', variety: 'Bourborn',quantity : '120kg', cup_Score: '84'},
  ]
  order_id: any;
  constructor(public globals: GlobalsService,
            private router : Router) {
    this.termStatus = '';
    this.display = '10';
   }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
  }

  setStatus(term: any) {
    this.termStatus = term;
    console.log(this.termStatus)
  }
  toggleStatus() {
    this.showStatus = !this.showStatus;
    if(this.showStatus==false){
    document.getElementById('status_id').style.border="1px solid #30855c";
  }
  else{
    document.getElementById('status_id').style.border="1px solid #d6d6d6";
  
  }
  }
 
  setDisplay(displayData:any){
    this.display=displayData;
  }
  toggleDisplay() {
    this.showDisplay = !this.showDisplay;
    if(this.showDisplay==false){
      document.getElementById('display_id').style.border="1px solid #30855c";
    }
    else{
      document.getElementById('display_id').style.border="1px solid #d6d6d6";
    
    }
  }
   // Function Name : CheckAll
  // Description: This function helps to check all roles of the role list.
  checkAll(ev: any) {
    this.mainData.forEach(x => x.state = ev.target.checked)
  }

  // Function Name : IsAllchecked
  // Description: This function helps to check single role.
  isAllChecked() {
    return this.mainData.every(_ => _.state);
  } 
  reRouteTo(item : any) {
    this.order_id = item.id;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id": encodeURIComponent(this.order_id),
        "type":encodeURIComponent("hrc"),
      }
    }
    this.router.navigate(['/features/coffee-details'], navigationExtras);
  }

}
