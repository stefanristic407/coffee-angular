import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-coffee-procured-tab',
  templateUrl: './coffee-procured-tab.component.html',
  styleUrls: ['./coffee-procured-tab.component.css']
})
export class CoffeeProcuredTabComponent implements OnInit {
  termStatus: any;
  showStatus: boolean = true;

  display: any;
  showDisplay: boolean = true;
  appLanguage?: any;
  roaster_id: string;
  mainData: any[] = [];
  originArray: any[] = [];
  searchString: string = '';

  constructor(public globals: GlobalsService, public roasterService: RoasterserviceService,
    public router: Router, public cookieService: CookieService, public roasteryProfileService: RoasteryProfileService,) {
    this.termStatus = { name: 'All', isoCode: '' };
    this.display = '10';
    this.roaster_id = this.cookieService.get('roaster_id');
  }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
    this.getProcuredCoffeeList();
    this.originArray.push({ name: 'All', isoCode: '' });
    this.originArray = this.originArray.concat(this.roasteryProfileService.countryList);

  }
  getProcuredCoffeeList() {
    let origin = this.termStatus && this.termStatus.name !== 'All' ? this.termStatus.isoCode : undefined;
    let displayCount = this.display ? this.display : undefined;
    let searchString = this.searchString ? this.searchString : undefined;
    this.mainData = [];
    this.roasterService.getProcuredCoffeeList(this.roaster_id, origin, displayCount, searchString).subscribe(
      response => {
        console.log(response);
        if (response && response['result']) {
          this.mainData = response['result'];
        }
      }, err => {
        console.log(err);
      }
    );
  }

  setStatus(term: any, term1?) {
    this.termStatus = term;
    this.getProcuredCoffeeList();
  }
  toggleStatus() {
    this.showStatus = !this.showStatus;
    if (this.showStatus == false) {
      document.getElementById('status_id').style.border = "1px solid #30855c";
    }
    else {
      document.getElementById('status_id').style.border = "1px solid #d6d6d6";
    }
  }

  setDisplay(displayData: any) {
    this.display = displayData;
    this.getProcuredCoffeeList();
  }
  toggleDisplay() {
    this.showDisplay = !this.showDisplay;
    if (this.showDisplay == false) {
      document.getElementById('display_id').style.border = "1px solid #30855c";
    }
    else {
      document.getElementById('display_id').style.border = "1px solid #d6d6d6";

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
  onEdit(item) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        orderId: item.id,
      }
    };
    this.router.navigate(["/features/lot-sale"], navigationExtras);
  }

}
