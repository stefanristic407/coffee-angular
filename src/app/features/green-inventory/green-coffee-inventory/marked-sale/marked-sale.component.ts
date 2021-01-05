import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-marked-sale',
  templateUrl: './marked-sale.component.html',
  styleUrls: ['./marked-sale.component.css']
})
export class MarkedSaleComponent implements OnInit {

  termStatus: any;
  showStatus: boolean = true;
  
  display:any;
  showDisplay:boolean = true;
  appLanguage?: any;

  mainData:any[] = [];
  roaster_id: string;
  
  constructor(public globals: GlobalsService, public roasterService:RoasterserviceService,
    public cookieService: CookieService) {
    this.termStatus = {name: "All", statusCode: ''};
    this.display = '10';
    this.roaster_id = this.cookieService.get('roaster_id');
   }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
    console.log("get marked sale");
    
    this.getCoffeeSaleList();
  }
  getCoffeeSaleList(){
    let origin = this.termStatus && this.termStatus.name !== 'All' ? this.termStatus.statusCode: undefined;
    let displayCount = this.display ? this.display: undefined;
    this.mainData = [];
    this.roasterService.getCoffeeSaleList(this.roaster_id, origin, displayCount).subscribe(
      response => {
        console.log(response);
        if(response && response['result']){
          this.mainData = response['result'];
        }
      }, err =>{
        console.log(err);
      }
    );
  }

  setStatus(termName: any, statusCode:any) {
    this.termStatus = {name: termName, statusCode: statusCode};
    this.getCoffeeSaleList();
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
    this.getCoffeeSaleList();
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
