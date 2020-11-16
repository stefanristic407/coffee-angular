import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

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

  mainData:any[] = [
    { product_Name: 'Origanic washed Micro-lot', availability_Name: 'Finca La Pampa', origin: 'Brazil', variety: 'Bourborn',available: '87 bags', cup_Score: '84.5',status:'Instock', Actions: 'View' },
    { product_Name: 'Blend washed', availability_Name: 'Gesha', origin: 'Guatemala', variety: 'Bourborn',available: '27 bags', cup_Score: '88',status:'Hidden', Actions: 'View' },
    {  product_Name: 'FTO blend', availability_Name: 'Finca La Toboba', origin: 'Spain', variety: 'Bourborn',available: '57 bags', cup_Score: '81.5',status:'Sold', Actions: 'View' },
    {  product_Name: 'Mebratu', availability_Name: 'Asopraaaa', origin: 'Brazil', variety: 'Bourborn',available: '93 bags', cup_Score: '85.4',status:'Instock', Actions: 'View' },
    {  product_Name: 'FTO Semi washed', availability_Name: 'Cafe Directo', origin: 'Sweden', variety: 'Bourborn',available: '110 bags', cup_Score: '82',status:'Sold', Actions: 'View' },
    {  product_Name: 'Blend', availability_Name: 'La Isabela', origin: 'Vietnam', variety: 'Bourborn',available: '90 bags', cup_Score: '84',status:'Hidden', Actions: 'View' },
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
