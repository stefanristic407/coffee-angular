import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UserserviceService } from 'src/services/users/userservice.service';
import { GlobalsService } from '@services';
import * as _ from 'underscore';

@Injectable({
    providedIn: 'root',
})
export class SourcingService {
    roasterId: string;

    finalCertify: any;

    // Lot data
    polygonId: string;

    queryParams: any = new BehaviorSubject({
        origin: '',
        species: '',
        name: '',
        grade: null,
        crop_year: null,
        weight: 'kg',
        sort_by: '',
        sort_order: 'asc',
    });
    queryParams$: any = this.queryParams.asObservable();

    viewMode: any = new BehaviorSubject('grid');
    viewMode$: any = this.viewMode.asObservable();

    flavourList: any = new BehaviorSubject([]);
    flavourList$: any = this.flavourList.asObservable();

    // Details of an estate
    estateId: any;
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
    harvestId: any;
    harvestDetail: any = {};
    otherGreenList: any;
    availableCertify: any;

    // Details of an lot
    lotId: any;
    lot: any;

    constructor(
        private http: HttpClient,
        public userService: UserserviceService,
        public globals: GlobalsService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.getEstateCertificates();
    }

    clearQueryParams() {
        this.queryParams.next({
            origin: '',
            species: '',
            name: '',
            grade: null,
            crop_year: null,
            weight: 'kg',
            sort_by: '',
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
        console.log('estateId', this.estateId);
        this.userService.getEstateBrandProfileDetail(this.estateId, 'home-page').subscribe((res: any) => {
            if (res.success) {
                this.estateHomepage = res.result;
                console.log(this.estateHomepage);
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
        this.userService.getavailableLots(this.roasterId, this.estateId).subscribe((res: any) => {
            if (res.success) {
                this.estateLots = res.result;
                this.estateLots.forEach((element) => {
                    element.varietiesStr = _.pluck(element.varieties, 'name').join(', ');
                    if (element.polygon_coordinates) {
                        try {
                            element.polygon_coordinates = JSON.parse(element.polygon_coordinates);
                            element.center = element.polygon_coordinates[0][0];
                        } catch {}
                    }
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
        this.userService.getEachEsateReviews(this.estateId).subscribe((res: any) => {
            if (res.success) {
                this.reviewsList = res.result;
                console.log(this.reviewsList);
            }
        });
    }

    getEstateSummary() {
        this.userService.getEachEsateReviewsSummary(this.estateId).subscribe((res: any) => {
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
                this.otherGreenList = res.result;
            }
        });
    }

    getEachGreenCertify() {
        this.userService.getEachEsateCertificates(this.estateId).subscribe((res: any) => {
            if (res.success) {
                this.availableCertify = res.result;
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
                this.flavourList.next(res.result);
            }
        });
    }

    getCertificateType(typeId) {
        return this.finalCertify[typeId] || {};
    }
}
