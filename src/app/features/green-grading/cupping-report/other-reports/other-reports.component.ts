import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { YourServicesService } from 'src/services/your-services/your-services.service';
import { CuppingReportService } from '../cupping-report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sewn-other-reports',
  templateUrl: './other-reports.component.html',
  styleUrls: ['./other-reports.component.css']
})
export class OtherReportsComponent implements OnInit {

  termRole: any;
  roles: any;
  role_id: any;
  termStatus: any;
  teamRole: any;
  showVar: boolean = true;
  showRole: boolean = true;
  term: any;

  mainData: any[] = [
    {
      id: '#90727',
      name: 'Finca la pampa',
      region: 'Colombia',
      evaluators: 'Molly Jennings, +3',
      date: '24 Jan 2019',
      average: 82.5
    },
    {
      id: '#56076',
      name: 'Gesha',
      region: 'Ethopia',
      evaluators: 'Max Howard',
      date: '12 Jan 2019',
      average: 86.43
    },
    {
      id: '#12416',
      name: 'Finca la pampa',
      region: 'Brazil',
      evaluators: 'Eugenia McGuire + 2',
      date: '13 Oct 2018',
      average: 79.04
    },
    {
      id: '#71716',
      name: 'Asoproaaa',
      region: 'Papa New..',
      evaluators: 'Marcus Vaughn',
      date: '02 Dec 2019',
      average: 85.34
    },
    {
      id: '#12416',
      name: 'Cafe Directo',
      region: 'Colombia',
      evaluators: 'Darrell Allison +1',
      date: '02 Dec 2019',
      average: 77.34
    },
    {
      id: '#56076',
      name: 'La Isabela',
      region: 'Colombia',
      evaluators: 'Alan Webster + 1',
      date: '24 Jan 2019',
      average: 82.5
    }
  ]
  roleData: string;
  roleID: string;


  constructor(public globals: GlobalsService, public yourService: YourServicesService, public cuppingService: CuppingReportService, private router: Router) {
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
    if (this.showRole == false) {
      document.getElementById('role_id').style.border = "1px solid #30855c";
    }
    else {
      document.getElementById('role_id').style.border = "1px solid #d6d6d6";

    }
  }

  toggleStatus() {
    this.showVar = !this.showVar;
    if (this.showVar == false) {
      document.getElementById('status_id').style.border = "1px solid #30855c";
    }
    else {
      document.getElementById('status_id').style.border = "1px solid #d6d6d6";

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
  otherReportLink(data: any) {
    this.cuppingService.otherReportDetails = data;
    this.router.navigate(['/features/other-cupping-service']);
  }

}
