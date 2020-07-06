import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sewn-about-roastery',
  templateUrl: './about-roastery.component.html',
  styleUrls: ['./about-roastery.component.css']
})
export class AboutRoasteryComponent implements OnInit {

  owner_name : string;
  founded_in : any;
  summary : string;
  kgs:any = '';
  capacity:string;
  capabilities : string;
  male_num : string;
  female_num : string;
  employee_avg : any;
  employee_nos : any;
  brand_name : string;
  short_descr : string;
  emp_title : string;
  emp_name : string = ''

  ownerNameError : string;
  foundedInError : string;
  employeeNoError : string;
  employeeAvgError : string;
  femaleNumError : string;
  maleNumError : string;
  capacityError : string;
  kilogramsError : string;
  capabilitiesError : string;
  brandNameError : string;
  brandLogoError : string;
  shortDescError : string;
  empTitleError : string;
  empNameError : string;
  

  constructor() { }

  ngOnInit(): void {
   
  }
  
  onKeyPress(event: any) {
    if (event.target.value == "") {
      document.getElementById(event.target.id).style.border = "1px solid #D50000";
    } else {
      document.getElementById(event.target.id).style.border = "1px solid #d6d6d6";
    }
  
}

}
