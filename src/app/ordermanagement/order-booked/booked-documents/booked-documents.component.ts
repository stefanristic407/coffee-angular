import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { OrderBookedService } from '../order-booked.service';

@Component({
  selector: 'sewn-booked-documents',
  templateUrl: './booked-documents.component.html',
  styleUrls: ['./booked-documents.component.css']
})
export class BookedDocumentsComponent implements OnInit {
  

  // mainData:any[] = [
  //   { documentdate: 'Export documents from Colombia ', date: '24 Jan 2020', owner: 'Kevin Bailey'},
  //   { documentdate: 'License to Roast', date: '24 Jan 2020', owner: 'Kevin Bailey'},
  //   { documentdate: 'Certificates - Rain forest alliance', date: '24 Jan 2020', owner: 'Kevin Bailey'},
  //   { documentdate: 'Import documents for Ethopia', date: '-', owner: 'Kevin Bailey'},
  //   { documentdate: 'T & C agreement', date: '-', owner: 'Kevin Bailey'},
  //   { documentdate: 'T & C agreementnd', date: '24 Jan 2020', owner: 'Kevin Bailey'},
  // ]

  termStatus: any;
  showStatus: boolean = true;
  appLanguage?:any;
  constructor(public globals: GlobalsService,public bookedService: OrderBookedService) { }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
    this.termStatus='';
  }

  // Function Name : CheckAll
  // Description: This function helps to check all roles of the role list.
  checkAll(ev: any) {
    this.bookedService.documentsList.forEach(x => x.state = ev.target.checked)
  }

  // Function Name : IsAllchecked
  // Description: This function helps to check single role.
  isAllChecked() {
    // return this.bookedService.documentsList.every(_ => _.state);
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
  downloadFile(item:any){
    const a = document.createElement("a"); 
    a.href = item.url ;
    a.download = item.name;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); 
  }
}
