import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { GreenGradingService } from '@services';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-process-details',
    templateUrl: './process-details.component.html',
    styleUrls: ['./process-details.component.scss'],
})
export class ProcessDetailsComponent implements OnInit {
    @Output() back = new EventEmitter<any>();
    @Input() harvestId;
    roasterId: any;

    col1 = [
        {
            label: 'Wet Mill',
            key: 'Tapucha Mill',
        },
        {
            label: 'Wet Mill Processing',
            key: 'process',
        },
        {
            label: 'Wet Mill Process description',
            key: 'description',
        },
        {
            label: 'Fermentation/h',
            key: 'fermentation',
        },
        {
            label: 'Parchment weight after milling',
            key: 'parchment_weight',
        },
    ];
    col2 = [
        {
            label: 'Dry Mill',
            key: 'Tapucha Mill',
            star: true,
        },
        {
            label: 'Dry Mill Processing*',
            key: 'process',
        },
        {
            label: 'Dry Mill Process description*',
            key: 'description',
        },
        {
            label: 'Drying Period*',
            key: 'drying_period',
        },
        {
            label: 'Screen Size*',
            key: 'screen_size',
        },
        {
            label: 'Density',
            key: 'density',
        },
        {
            label: 'Number of Defects*',
            key: 'no_of_defects',
        },
        {
            label: 'Preparation*',
            key: 'preparation',
        },
        {
            label: 'Quality grade*',
            key: 'quality_grade',
        },
        {
            label: 'Moisture content*',
            key: 'moisture_content',
            isPercent: true,
        },
        {
            label: 'Water activity*',
            key: 'water_activity',
        },
    ];
    dataList: any = {
        wet: {},
        dry: {},
    };

    constructor(private greenGradingService: GreenGradingService, private cookieService: CookieService) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.viewProcessDetails();
    }

    viewProcessDetails() {
        if (this.harvestId) {
            this.greenGradingService.getProcessDetails(this.roasterId, this.harvestId).subscribe((res: any) => {
                if (res.success === true) {
                    for (const col of this.col1) {
                        this.dataList.wet[col.key] = res.result.wet_milling[col.key] ?? col.key;
                    }

                    for (const col of this.col2) {
                        this.dataList.dry[col.key] = res.result.dry_milling[col.key] ?? col.key;
                    }
                }
            });
        }
    }

    backRequests() {
        this.back.emit();
    }
}
