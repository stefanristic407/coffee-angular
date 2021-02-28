import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
    selector: 'app-api-requests-table',
    templateUrl: './api-requests-table.component.html',
    styleUrls: ['./api-requests-table.component.css'],
})
export class ApiRequestsTableComponent implements OnInit {
    showDateRange: any;
    @ViewChild('calendar')
    calendar: any;
    showDisplay: boolean = true;
    display: any;
    rangeDates: any;
    appLanguage?: any = {};
    greenActive: any = 0;
    termStatus: any;
    showStatus: boolean = true;
    constructor(public globals: GlobalsService) {
        this.termStatus = '';
        this.display = '10';
    }

    ngOnInit(): void {
        this.language();
    }

    toggleDisplay() {
        this.showDisplay = !this.showDisplay;
        if (this.showDisplay == false) {
            document.getElementById('display_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('display_id').style.border = '1px solid #d6d6d6';
        }
    }

    setDisplay(displayData: any) {
        this.display = displayData;
    }

    openCalendar(event: any) {
        this.calendar.showOverlay(this.calendar.inputfieldViewChild.nativeElement);
        event.stopPropagation();
    }

    language() {
        this.appLanguage = this.globals.languageJson;
        this.greenActive++;
    }

    setStatus(term: any) {
        this.termStatus = term;
        console.log(this.termStatus);
    }

    toggleStatus() {
        this.showStatus = !this.showStatus;
        if (this.showStatus == false) {
            document.getElementById('status_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('status_id').style.border = '1px solid #d6d6d6';
        }
    }

    filterDate(event: any) {}
}
