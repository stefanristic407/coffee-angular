import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { ActivatedRoute } from '@angular/router';
import { SourcingService } from '../sourcing.service';

@Component({
    selector: 'app-estate-details',
    templateUrl: './estate-details.component.html',
    styleUrls: ['./estate-details.component.scss'],
})
export class EstateDetailsComponent implements OnInit {
    appLanguage?: any;
    isLoaded = false;
    brandProfileEstateWeb = 'https://qa-brand-profile.sewnstaging.com/estatebrandprofile/green-coffee';
    estateProfile = 'https://qa-estates-portal.sewnstaging.com/features/estate-profile';
    selectedTab = 0;

    constructor(public globals: GlobalsService, private route: ActivatedRoute, public sourcing: SourcingService) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            if (params.has('id')) {
                this.sourcing.estateId = params.get('id');
                this.refreshData();
            }
        });
    }

    refreshData() {
        this.isLoaded = true;
        this.sourcing.estate = null;
        this.sourcing.lot = null;
        this.sourcing.estateDetailList();
        this.sourcing.getEstateHomepage();
        this.sourcing.getEstateAboutUs();
        this.sourcing.getLotsList();
        this.sourcing.getGreenCoffee();
        this.sourcing.estateEmployees();
        this.sourcing.getEachEstateCertify();
        this.sourcing.estateGalleryFiles();
        this.sourcing.getEstateReviews();
        this.sourcing.getEstateSummary();
    }
}
