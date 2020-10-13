import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grade-service',
  templateUrl: './grade-service.component.html',
  styleUrls: ['./grade-service.component.css']
})
export class GradeServiceComponent implements OnInit {
  term : string;
  termRole: any;
  roles: any;
  role_id: any;
  termStatus: any;
  teamRole:any;
  showVar: boolean = true;
  showRole:boolean = true;
  roleData: string;
  roleID: string;
  mainData:any[] = [
    {
      orderId: '#12345',
      name: 'Luis Stanley',
      country: 'Colombia',
      date: '24/09/2019',
      service: 'Cupping Service',
      status:'In - progress'
    },
    {
      orderId: '#12346',
      name: 'Lillian Duncan',
      country: 'Brazil',
      date: '4/09/2019',
      service: 'Cupping Service',
      status:'In - progress'
    },
    {
      orderId: '#12347',
      name: 'Lillian Duncan',
      country: 'Colombia',
      date: '14/11/2019',
      service: 'Cupping Service',
      status:'In - progress'
    }
  ]
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
}
