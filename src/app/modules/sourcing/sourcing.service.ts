import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService, GlobalsService, OriginService, CommonService } from '@services';
import * as _ from 'underscore';
import { OrganizationType, QuantityUnit } from '@enums';
import { ApiResponse } from '@models';
import { DropdownItem } from 'primeng/dropdown';

@Injectable({
    providedIn: 'root',
})
export class SourcingService {
    roasterId: string;

    finalCertify: any;

    // Lot data
    polygonId: string;

    sortItems: any[];
    sortParam: string;
    quantityUnit = QuantityUnit.kg;
    queryParams: any = new BehaviorSubject({});
    queryParams$: any = this.queryParams.asObservable();

    viewMode: any = new BehaviorSubject('grid');
    viewMode$: any = this.viewMode.asObservable();

    showUnitFilter = false;

    flavourList: any[];
    generalFlavourList: any[];

    origins: DropdownItem[] = [];

    // Details of an estate
    estateId: number;
    estate: any;
    estateCertify: any;
    estateHomepage: any;
    estateAboutUs: any;
    estateContacts: any[] = [];
    estateLots: any[] = [];
    estateGreenList: any[] = [];
    estateGalleryImages: any;
    estateReviewsSummary: any;
    estateReviewsAverage: any;
    estateReviewStars: any;
    reviewColors = ['#ff1e5a', '#ffa001', '#649a2b'];
    reviewsList: any[];

    // Details of an green coffee
    harvestId: number;
    harvestDetail: any = {};
    otherGreenList: any;

    // Details of an lot
    lotId: number;
    lot: any;

    constructor(
        public userService: UserserviceService,
        public globals: GlobalsService,
        private commonService: CommonService,
        private originService: OriginService,
        private cookieService: CookieService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.getEstateCertificates();
        this.flavourprofileList();
        this.getOrigins();
    }

    clearQueryParams() {
        this.sortParam = null;
        this.queryParams.next({
            origin: '',
            species: '',
            name: '',
            grade: null,
            crop_year: null,
            available_coffee: null,
            sort_by: 'name',
            sort_order: 'asc',
        });
    }

    // Estate detail apis
    estateDetailList() {
        this.userService.getAvailableEstateList(this.roasterId, this.estateId).subscribe((res: any) => {
            if (res.success) {
                this.estate = res.result;
                if (this.estate.gps_coordinates) {
                    const coordinates = this.estate.gps_coordinates.split(',');
                    this.estate.latitude = parseFloat(coordinates[0].slice(0, -3));
                    this.estate.longitude = parseFloat(coordinates[1].slice(0, -3));
                }
            }
        });
    }

    getEachEstateCertify() {
        this.userService.getEachEsateCertificates(this.estateId).subscribe((res: any) => {
            if (res.success) {
                this.estateCertify = res.result;
            }
        });
    }

    getEstateHomepage() {
        this.userService.getEstateBrandProfileDetail(this.estateId, 'home-page').subscribe((res: any) => {
            if (res.success) {
                this.estateHomepage = res.result;
            }
        });
    }

    getEstateAboutUs() {
        this.userService.getEstateBrandProfileDetail(this.estateId, 'about-us').subscribe((res: any) => {
            if (res.success) {
                this.estateAboutUs = res.result;
            }
        });
    }

    estateEmployees() {
        this.userService.getEstateContacts(this.estateId).subscribe((res: any) => {
            if (res.success) {
                this.estateContacts = res.result;
            }
        });
    }

    getLotsList() {
        this.estateLots = null;
        this.userService.getavailableLots(this.roasterId, this.estateId).subscribe((res: any) => {
            if (res.success) {
                this.estateLots = res.result;
                if (this.estateLots?.length) {
                    this.estateLots.forEach((element) => {
                        element.varietiesStr = _.pluck(element.varieties, 'name').join(', ');
                    });
                }
            }
        });
    }

    getGreenCoffee() {
        this.userService.getGreenCoffee(this.roasterId, this.estateId).subscribe((res: any) => {
            if (res.success) {
                this.estateGreenList = res.result;
            }
        });
    }

    estateGalleryFiles() {
        this.userService.getEstateGallery(this.estateId).subscribe((res: any) => {
            if (res.success) {
                this.estateGalleryImages = res.result;
            }
        });
    }

    getEstateReviews() {
        this.userService.getReviews(this.estateId, OrganizationType.ESTATE).subscribe((res: any) => {
            if (res.success) {
                this.reviewsList = res.result;
            }
        });
    }

    getEstateSummary() {
        this.userService.getReviewsSummary(this.estateId, OrganizationType.ESTATE).subscribe((res: any) => {
            if (res.success) {
                this.estateReviewsSummary = res.result.summary;
                this.estateReviewsAverage = res.result.average;
                this.estateReviewStars = [];
                for (let idx = 5; idx > 0; idx--) {
                    const percent =
                        (this.estateReviewsSummary[idx + '_star'] * 100) / this.estateReviewsSummary.total_review;
                    this.estateReviewStars.push({
                        label: idx + '.0',
                        value: this.estateReviewsSummary[idx + '_star'],
                        percent,
                        color: this.reviewColors[Math.floor(percent / 34)],
                    });
                }
            }
        });
    }

    // Harvest detail apis
    availableDetailList(resolve: any = null, reject: any = null) {
        this.userService.getGreenCoffeeDetails(this.roasterId, this.harvestId).subscribe((res: any) => {
            if (res.success) {
                this.harvestDetail = res.result;
                this.lotId = this.harvestDetail.lot_id;
                this.getLotDetails();
                if (resolve) {
                    resolve();
                }
            } else {
                if (reject) {
                    reject();
                }
            }
        });
    }

    getLotDetails(resolve: any = null) {
        this.userService.getRoasterLotDetails(this.roasterId, this.estateId, this.lotId).subscribe((res: any) => {
            if (res.success) {
                this.lot = { ...res.result, varietiesStr: _.pluck(res.result.varieties, 'name').join(', ') };
            }
            if (resolve) {
                resolve();
            }
        });
    }

    otherAvailableCoffee() {
        this.userService.getGreenCoffee(this.roasterId, this.estateId).subscribe((res: any) => {
            if (res.success) {
                this.otherGreenList = res.result.filter((element) => element.harvest_id !== this.harvestId);
            }
        });
    }

    // Constant apis
    getEstateCertificates() {
        this.userService.getEstateCertificates().subscribe((res: any) => {
            if (res.success) {
                this.finalCertify = res.result;
            }
        });
    }

    flavourprofileList() {
        this.userService.getFlavourProfile().subscribe((res: any) => {
            if (res.success) {
                this.flavourList = res.result;
                this.generalFlavourList = this.flavourList.filter((element) => !element.parent_id);
            }
        });
    }

    getFlavour(flavourId) {
        return this.flavourList?.length ? this.flavourList.find((element) => element.id === flavourId) : null;
    }

    getCertificateType(typeId) {
        return this.finalCertify ? this.finalCertify[typeId] : null;
    }

    getOrigins() {
        this.originService.getOrigins({ visibility: true }).subscribe((res: ApiResponse<any>) => {
            if (res.success) {
                this.origins = _.chain(res.result.origins)
                    .map((item) => {
                        return { value: item, label: this.commonService.getCountryName(item) || item };
                    })
                    .value();
            }
        });
    }

    openCert(url) {
        window.open(url, '_blank');
    }
}
