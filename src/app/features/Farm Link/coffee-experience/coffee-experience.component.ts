// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of  Orders List,Search and Filters.

import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';
import { GlobalsService } from 'src/services/globals.service';

@Component({
    selector: 'app-coffee-experience',
    templateUrl: './coffee-experience.component.html',
    styleUrls: ['./coffee-experience.component.css'],
})
export class CoffeeExperienceComponent implements OnInit {
    appLanguage?: any = {};
    greenActive: any = 0;
    loader: boolean;
    searchTerm: any;
    estatetermStatus;
    estatetermOrigin;
    estatetermType;
    displayNumbers;
    coffeetermOriginMob;
    showOrigin: boolean = true;
    showDisplay: boolean = true;
    showStatus: boolean = true;
    constructor(public globals: GlobalsService) {}

    ngOnInit(): void {
        this.language();
    }
    language() {
        this.appLanguage = this.globals.languageJson;
        this.greenActive++;
    }
    toggleOrigin() {
        this.showOrigin = !this.showOrigin;
        if (this.showOrigin == false) {
            document.getElementById('origin_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('origin_id').style.border = '1px solid #d6d6d6';
        }
    }
    toggleStatus() {
        this.showStatus = !this.showStatus;
        if (this.showStatus == false) {
            document.getElementById('status_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('status_id').style.border = '1px solid #d6d6d6';
        }
    }
    toggleDisplay() {
        this.showDisplay = !this.showDisplay;
        if (this.showDisplay == false) {
            document.getElementById('display_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('display_id').style.border = '1px solid #d6d6d6';
        }
    }
}
