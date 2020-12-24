import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/services/globals.service';


@Component({
  selector: 'app-generated-keys',
  templateUrl: './generated-keys.component.html',
  styleUrls: ['./generated-keys.component.css']
})
export class GeneratedKeysComponent implements OnInit {

  termStatus: any;
  showStatus: boolean = true;
  
  display:any;
  showDisplay:boolean = true;
  appLanguage?: any;

  mainData:any[] = [
    { customer: 'Third wave coffee roasters', customer_type: 'Micro-Roaster', date_requested: '24 Jan 2020', key_generated_on: '24 Jan 2020', key_status: 'Active'},
    { customer: 'Home brew coffee', customer_type: 'HoReCa', date_requested: '12 Jan 2020', key_generated_on: '12 Jan 2020', key_status: 'Active'},
    { customer: 'La Barista', customer_type: 'Micro-Roaster', date_requested: '13 Oct 2018', key_generated_on: '13 Oct 2018', key_status: 'Paused'},
    { customer: 'BRU coffee roastes', customer_type: 'HoReCa', date_requested: '02 Dec 2019', key_generated_on: '02 Dec 2019', key_status: 'Paused'},
    { customer: 'Blue Tokai roasters', customer_type: 'Micro-Roaster', date_requested: '02 Oct 2019', key_generated_on: '02 Oct 2019', key_status: 'Active'},
    { customer: 'La Barista', customer_type: 'HoReCa', date_requested: ' 19 Sep 2019', key_generated_on: '19 Sep 2019', key_status: 'Active'},
  ]
  constructor(public globals: GlobalsService, private toastrService: ToastrService) { 
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

  pauseKey(){
    this.toastrService.success("Key access has been paused");
  }
  deleteKey(){
    this.toastrService.error("Key has been delete");
  }

  reactiveuser(){
    this.toastrService.success("Key has been reactivated!");
  }


}
