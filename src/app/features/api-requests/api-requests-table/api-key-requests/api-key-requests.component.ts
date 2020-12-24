import { Component, OnInit,ViewChild } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-api-key-requests',
  templateUrl: './api-key-requests.component.html',
  styleUrls: ['./api-key-requests.component.css']
})
export class ApiKeyRequestsComponent implements OnInit {

	termStatus: any;
	showStatus: boolean = true;
	
	display:any;
	showDisplay:boolean = true;
	appLanguage?: any;
  
	mainData:any[] = [
	  { requested_by: 'Third wave coffee roasters', customer_type: 'Micro-Roaster', date_requested: '24 Jan 2020'},
	  { requested_by: 'Home brew coffee', customer_type: 'Micro-Roaster', date_requested: '12 Jan 2020'},
	  { requested_by: 'La Barista', customer_type: 'HoReCa', date_requested: '13 Oct 2018'},
	  { requested_by: 'BRU coffee roastes', customer_type: 'Micro-Roaster', date_requested: '02 Dec 2019'},
	  { requested_by: 'Blue Tokai roasters', customer_type: 'HoReCa', date_requested: '02 Oct 2019'},
	  { requested_by: 'La Barista', customer_type: 'HoReCa', date_requested: '19 Sep 2019'},
	]
	constructor(public globals: GlobalsService) { 
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
  
		
}
