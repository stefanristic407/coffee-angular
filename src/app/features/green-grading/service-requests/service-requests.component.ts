import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-requests',
  templateUrl: './service-requests.component.html',
  styleUrls: ['./service-requests.component.css']
})
export class ServiceRequestsComponent implements OnInit {
  termRole: any;
  roles: any;
  role_id: any;
  termStatus: any;
  teamRole:any;
  showVar: boolean = true;
  showRole:boolean = true;
  term:any;

  mainData:any[] = [
    {
      id: '#90727',
      name: 'Finca la pampa',
      origin: 'Colombia',
      region: 'Colombia',
      date:'24/09/2019',
      serviceType:'Cupping Service',
      status: 'In - progress',
      type: 'Invited'
    },
    {
      id: '#123442',
      name: 'Le Carter',
      origin: 'Brazil',
      region: 'Brazil',
      date:'12/28/2020',
      serviceType:'Cupping Service',
      status: 'Complete',
      type: 'Assigned'
    },
    {
      id: '#773449',
      name: 'Finca La Toboba',
      origin: 'Ethopia',
      region: 'Ethopia',
      date:'11/22/2020',
      serviceType:'Cupping Service',
      status: 'In - progress',
      type: 'Assigned'
    },
    {
      id: '#343060',
      name: 'Cafe Directo',
      origin: 'Ethopia',
      region: 'Ethopia',
      date:'12/06/2020',
      serviceType:'Cupping Service',
      status: 'In - progress',
      type: 'Invited'
    },
    {
      id: '#890455',
      name: 'LAsoproaaa',
      origin: 'Colombia',
      region: 'Colombia',
      date:'24/09/2019',
      serviceType:'Cupping Service',
      status: 'In - progress',
      type: 'Invited'
    }
  ]
  roleData: string;
  roleID: string;

 
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
