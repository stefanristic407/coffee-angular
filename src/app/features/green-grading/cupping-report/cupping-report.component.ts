import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cupping-report',
  templateUrl: './cupping-report.component.html',
  styleUrls: ['./cupping-report.component.css']
})
export class CuppingReportComponent implements OnInit {
  termRole: any;
  roles: any;
  role_id: any;
  termStatus: any;
  teamRole:any;
  showVar: boolean = true;
  showRole:boolean = true;
  term:any;
  roleData: string;
  roleID: string;
	selected: Date;
	rangeDates: any;
  @ViewChild('calendar')
  	calendar: any;
  constructor() {
    this.termStatus = '';
    this.termRole = '';
   }

  ngOnInit(): void {
  }

  
  setTeamRole(term: any, roleId: any) {
    this.teamRole = term;
    this.role_id = roleId;
  }
 // Function Name : Status Filiter
  // Description: This function helps to filiter the users based on the selected status fiiter.

  setStatus(term: any) {
    this.termStatus = term;
    console.log(this.termStatus)
  }
  // Function Name : Roles Filiter
  // Description: This function helps to filiter the users based on the selected roles fiiter. 

  setRole(term: any) {
    this.termRole = term;
  }
  toggleRole() {
    this.showRole = !this.showRole;
    if(this.showRole==false){
      document.getElementById('role_id').style.border="1px solid #30855c";
    }
    else{
      document.getElementById('role_id').style.border="1px solid #d6d6d6";
    
    }
   }
  
   toggleStatus() {
    this.showVar = !this.showVar;
    if(this.showVar==false){
    document.getElementById('status_id').style.border="1px solid #30855c";
  }
  else{
    document.getElementById('status_id').style.border="1px solid #d6d6d6";
  
  }
  }

  openCalendar(event: any){
		this.calendar.showOverlay(this.calendar.inputfieldViewChild.nativeElement);
  		event.stopPropagation();
	}
}
