import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserserviceService } from '@services';
import { RoasterserviceService } from '@services';
import { SourcingService } from '../sourcing.service';
declare var $: any;

@Component({
    selector: 'app-estate-details',
    templateUrl: './estate-details.component.html',
    styleUrls: ['./estate-details.component.scss'],
})
export class EstateDetailsComponent implements OnInit, AfterViewInit {
    appLanguage?: any;
    isLoaded = false;
    brandProfileEstateWeb = 'https://qa-brand-profile.sewnstaging.com/estatebrandprofile/green-coffee';
    estateProfile = 'https://qa-estates-portal.sewnstaging.com/features/estate-profile';

    modalRef: BsModalRef;
    public coffeedata: any[] = [
        {
            estatename: 'Finca La Pampa',
            name: 'Organic washed Micro-lot',
            origin: 'Colombia',
            species: 'Bourbon',
            price: '$7.4 USD / kg',
            quantity: '287 bags',
            image: '/assets/images/sourcing-image1.jpg',
            score: '84.5',
        },
        {
            estatename: 'Gesha',
            name: 'Blend washed',
            origin: 'Colombia',
            species: 'Bourbon',
            price: '$5.53USD / kg',
            quantity: '297 bags',
            image: '/assets/images/sourcing-image3.jpg',
            score: '88.0',
        },
        {
            estatename: 'Finca La Toboba',
            name: 'FTO blend',
            origin: 'Ethopia',
            species: 'Bourbon',
            price: '$8.92 USD /kg',
            quantity: '567 bags',
            image: '/assets/images/sourcing-image7.jpg',
            score: '81.5',
        },
    ];
    blogResult: string;
    countryValue: any;
    flavourName: any;
    certiImage: any;
    estateData: any;
    estateCetificateData: any;
    certifyEstate: any;
    galleryImages: any;

    constructor(
        private modalService: BsModalService,
        public globals: GlobalsService,
        private route: ActivatedRoute,
        public sourcing: SourcingService,
        public cookieService: CookieService,
        private userService: UserserviceService,
        private roasterService: RoasterserviceService,
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            if (params.has('id')) {
                this.sourcing.estateId = params.get('id');
                this.refreshData();
            }
        });
        this.language();
        this.blogResult = decodeURIComponent(this.route.snapshot.queryParams.dataLots);
    }

    ngAfterViewInit() {
        if (this.blogResult === 'true') {
            $('#nav-profile-tab3')[0].click();
        }
    }

    refreshData() {
        this.sourcing.estateDetailList();
        this.sourcing.getEstateHomepage();
        this.sourcing.getEstateAboutUs();
        this.sourcing.lotsList();
        this.sourcing.flavourprofileList();
        this.sourcing.greenCoffee();
        this.sourcing.estateEmployees();
        this.getEachEstateCertify();
        this.estateGalleryFiles();
        this.sourcing.getEstateReviews();
        this.sourcing.getEstateSummary();
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    language() {
        this.appLanguage = this.globals.languageJson;
        this.isLoaded = true;
    }

    getEachEstateCertify() {
        this.userService.getEachEsateCertificates(this.sourcing.estateId).subscribe((res: any) => {
            if (res.success) {
                this.certifyEstate = res.result;
                this.sourcing.overviewCertify = this.certifyEstate;
            }
        });
    }

    estateGalleryFiles() {
        this.userService.getEstateGallery(this.sourcing.estateId).subscribe((res: any) => {
            if (res.success) {
                this.galleryImages = res.result;
            }
        });
    }
}
