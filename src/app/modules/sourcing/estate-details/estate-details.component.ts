import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationType } from '@enums';
import { GlobalsService, ChatHandlerService, ResizeService, AuthService } from '@services';
import { SourcingService } from '../sourcing.service';
import { ResizeableComponent } from '@base-components';

@Component({
    selector: 'app-estate-details',
    templateUrl: './estate-details.component.html',
    styleUrls: ['./estate-details.component.scss'],
})
export class EstateDetailsComponent extends ResizeableComponent implements OnInit {
    @ViewChild('reviewsPosition') reviewsPosition: ElementRef;
    isLoaded = false;
    selectedTab = 0;

    constructor(
        public globals: GlobalsService,
        private route: ActivatedRoute,
        public sourcing: SourcingService,
        public chatSrv: ChatHandlerService,
        protected resizeService: ResizeService,
        private router: Router,
    ) {
        super(resizeService);
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
        this.sourcing.getEstateHomepage();
        this.sourcing.getEstateAboutUs();
        this.sourcing.getLotsList();
        this.sourcing.getGreenCoffee();
        this.sourcing.estateEmployees();
        this.sourcing.getEachEstateCertify();
        this.sourcing.estateGalleryFiles();
        this.sourcing.getEstateReviews();
        this.sourcing.getEstateSummary();
        const promises = [];
        promises.push(new Promise((resolve, reject) => this.sourcing.estateDetailList(resolve)));
        Promise.all(promises).then(() => {
            if (this.route.snapshot.queryParamMap.has('goToReviews')) {
                this.goToReviews();
            }
        });
    }

    chatWithEstate() {
        if (this.sourcing.estate.adminId) {
            this.chatSrv.openChatThread({
                user_id: +this.sourcing.estate.adminId,
                org_type: OrganizationType.ESTATE,
                org_id: +this.sourcing.estateId,
            });
        }
    }

    goToReviews() {
        if (this.selectedTab) {
            this.selectedTab = 0;
        }
        setTimeout(() => {
            this.reviewsPosition.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    routeToEstateProfile() {
        this.router.navigate(['/profile/es/' + this.sourcing.estateId]);
    }
}
