import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { WSOrganizationType } from '@models';
import { ChatHandlerService } from '@services';
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

    chatWithEstate() {
        this.chatSrv.openChatThread({
            user_id: +this.userId,
            org_type: WSOrganizationType.ESTATE,
            org_id: +this.sourcing.estateId,
        });
    }
}
