import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { SourcingService } from '../../sourcing.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
    appLanguage?: any;
    overviewActive: any = 0;

    public multi = [
        {
            name: 'Legend1',
            series: [
                {
                    name: '27',
                    value: 10,
                },
                {
                    name: '28',
                    value: 8,
                },
                {
                    name: '1',
                    value: 12,
                },
                {
                    name: '2',
                    value: 19,
                },
                {
                    name: '3',
                    value: 16,
                },
                {
                    name: '4',
                    value: 11,
                },
                {
                    name: '5',
                    value: 13,
                },
                {
                    name: '6',
                    value: 23,
                },
                {
                    name: '7',
                    value: 18,
                },
                {
                    name: '8',
                    value: 18,
                },
                {
                    name: '9',
                    value: 17,
                },
                {
                    name: '10',
                    value: 18,
                },
                {
                    name: '11',
                    value: 13,
                },
                {
                    name: '12',
                    value: 17,
                },
                {
                    name: '13',
                    value: 12,
                },
                {
                    name: '14',
                    value: 10,
                },
            ],
        },
        {
            name: 'Legend2',
            series: [
                {
                    name: '27',
                    value: 7,
                },
                {
                    name: '28',
                    value: 2,
                },
                {
                    name: '1',
                    value: 4,
                },
                {
                    name: '2',
                    value: 9,
                },
                {
                    name: '3',
                    value: 7,
                },
                {
                    name: '4',
                    value: 3,
                },
                {
                    name: '5',
                    value: 20,
                },
                {
                    name: '6',
                    value: 15,
                },
                {
                    name: '7',
                    value: 10,
                },
                {
                    name: '8',
                    value: 15,
                },
                {
                    name: '9',
                    value: 13,
                },
                {
                    name: '10',
                    value: 13,
                },
                {
                    name: '11',
                    value: 10,
                },
                {
                    name: '12',
                    value: 8,
                },
                {
                    name: '13',
                    value: 7,
                },
                {
                    name: '14',
                    value: 9,
                },
            ],
        },
    ];

    view: any[] = [1080, 340];

    // options for the chart
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = '';
    showYAxisLabel = true;
    yAxisLabel = 'Temperature (°C)';
    timeline = true;
    roundDomains = true;

    colorScheme = {
        domain: ['#f19634', '#7c6be8'],
    };

    // line, area
    autoScale = true;
    monthName: string;
    certiImage: any;
    brandProfileEstateWeb: string = 'https://qa-brand-profile.sewnstaging.com/estatebrandprofile/green-coffee';

    constructor(
        public globals: GlobalsService,
        public sourcing: SourcingService,
        private roasterService: RoasterserviceService,
    ) {}

    ngOnInit(): void {
        this.language();

        window.scroll(0, 0);
        this.sourcing.estateDetailList();
        // this.sourcing.getEstateReviews();
        // this.sourcing.getEstateSummary();
        // console.log(this.sourcing.overviewCertify);
    }
    language() {
        this.appLanguage = this.globals.languageJson;
        this.overviewActive++;
    }

    GetMonthName(month: number) {
        switch (month) {
            case 1:
                this.monthName = 'Jan';
                break;

            case 2:
                this.monthName = 'Feb';
                break;

            case 3:
                this.monthName = 'Mar';
                break;

            case 4:
                this.monthName = 'Apr';
                break;
            case 5:
                this.monthName = 'May';
                break;
            case 6:
                this.monthName = 'Jun';
                break;
            case 7:
                this.monthName = 'Jul';
                break;
            case 8:
                this.monthName = 'Aug';
                break;
            case 9:
                this.monthName = 'Sept';
                break;
            case 10:
                this.monthName = 'Oct';
                break;
            case 11:
                this.monthName = 'Nov';
                break;
            case 12:
                this.monthName = 'Dec';
                break;
            default:
                this.monthName = '';
                break;
        }
        return this.monthName;
    }
    brandProfileSite() {
        const redirectUrl = this.brandProfileEstateWeb;
        this.roasterService.navigate(redirectUrl, true);
    }
}
