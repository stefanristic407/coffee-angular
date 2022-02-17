import { Injectable } from '@angular/core';
import { OrganizationType, QuantityUnit } from '@enums';
import { ApiResponse, EstateOrganizationProfile } from '@models';
import {
    AuthService,
    CommonService,
    GlobalsService,
    OrganizationService,
    OriginService,
    UserService,
    VarietyService,
} from '@services';
import { DropdownItem } from 'primeng/dropdown';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'underscore';

@Injectable({
    providedIn: 'root',
})
export class SourcingService {
    roasterId: number;

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
    showAvailableFilter = false;
    showTypeFilter = false;

    flavourList: any[];
    generalFlavourList: any[];

    origins: DropdownItem[] = [];
    varieties: DropdownItem[] = [];

    // Details of an estate
    estateId: number;
    estate: EstateOrganizationProfile;
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
        private authService: AuthService,
        private commonService: CommonService,
        private organizationService: OrganizationService,
        private originService: OriginService,
        private varietyService: VarietyService,
        public globals: GlobalsService,
        public userService: UserService,
    ) {
        this.roasterId = this.authService.getOrgId();
        this.getEstateCertificates();
        this.flavourprofileList();
        this.getOrigins();
        this.getVarieties();
    }

    clearQueryParams() {
        this.sortParam = null;
        this.queryParams.next({
            origin: '',
            varieties: null,
            name: '',
            grade: null,
            crop_year: null,
            available_coffee: null,
            type: null,
            shipping_available: true,
            sort_by: 'name',
            sort_order: 'asc',
        });
    }

    // Estate detail apis
    estateDetailList(resolve?) {
        this.organizationService.getProfile(this.estateId, OrganizationType.ESTATE).subscribe({
            next: (result) => {
                if (result) {
                    this.estate = result as EstateOrganizationProfile;
                    if (resolve) {
                        resolve();
                    }
                }
            },
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
                this.estateLots = res.result || [];
                this.estateLots.forEach((element) => {
                    element.varietiesStr = _.pluck(element.varieties, 'name').join(', ');
                });
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

    getVarieties() {
        this.varietyService.getAllVarieties({ page: 0 }).subscribe((res: ApiResponse<any>) => {
            if (res.success) {
                this.varieties = (res.result || []).map((item) => {
                    return { value: item.title, label: item.title };
                });
            }
        });
    }

    openCert(url) {
        window.open(url, '_blank');
    }
}
