import { Component, OnInit } from '@angular/core';
import { GlobalsService, ChatHandlerService } from '@services';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OrganizationType } from '@enums';
import { SourcingService } from '../sourcing.service';

@Component({
    selector: 'app-estate-details',
    templateUrl: './estate-details.component.html',
    styleUrls: ['./estate-details.component.scss'],
})
export class EstateDetailsComponent implements OnInit {
    appLanguage?: any;
    isLoaded = false;
    selectedTab = 0;
    userId: string;

    constructor(
        public globals: GlobalsService,
        private route: ActivatedRoute,
        private cookieSrv: CookieService,
        public sourcing: SourcingService,
        public chatSrv: ChatHandlerService,
    ) {
        this.userId = this.cookieSrv.get('user_id');
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            if (params.has('id')) {
                this.sourcing.estateId = +params.get('id');
                this.refreshData();
            }
        });
        this.route.queryParamMap.subscribe((params) => {
            if (params.has('dataLots')) {
                this.selectedTab = 2;
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

    chatWithEstate() {
        if (this.sourcing.estate.admin_id) {
            this.chatSrv.openChatThread({
                user_id: +this.sourcing.estate.admin_id,
                org_type: OrganizationType.ESTATE,
                org_id: +this.sourcing.estateId,
            });
        }
    }
}
