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
    currentView: string = 'search';
    roaster_id: string;
    name: any;
    description: any;
    total_area: any;
    altitude_start: any;
    altitude_end: any;
    crop_year_start: any;
    crop_year_end: any;
    location: any;
    processing_types: any;
    soil_footprint: any;
    temperature_range: any;
    packaging: any;
    other_crops: any;
    wild_animals: any;
    gps_coordinates: any;
    founded_on: any;
    annual_prod: any;
    coffee_production: any;
    country: any;
    coordinates: any;
    latitude: number;
    longitude: number;
    emptyCoord: any;
    countryName: any;
    owner_name: any;
    grade_range: any;
    rating: any;
    agronomist_access: any;
    number_of_trees: any;
    city: any;
    varieties: any;
    activeLandlots: any;
    harvestData: any;
    harvestDetail: any = {};
    available_name: any;
    available_estate_name: any;
    lot_id: any;
    region: any;
    about: any;
    price: any;
    price_unit: any;
    quantity_count: any;
    quantity_type: any;
    quantity: any;
    quantity_unit: any;
    cup_score: any;
    cupped_at: any;
    evaluator_dp_thumb: any;
    evaluator_name: any;
    harvest_date: any;
    flavours: any;
    max_altitude_coffee: any;
    min_altitude_coffee: any;
    shipping_to: any;
    availabilty_variety: any;
    availability_species: any;
    ico_number: any;
    initial_quantity: any;
    state: any;
    type: any;
    listing_status: any;
    wet_fermentation: any;
    wet_process: any;
    dry_period: any;
    dry_process: any;
    dry_water_activity: any;
    dry_moisture_content: any;
    date_cupped: string;
    estate_rating: any;
    images: any;
    estateCertificates: any;
    resultArray: any;
    finalCertify: any;
    estate_id: any;
    otherGreenList: any;
    availableCertify: any;
    estateNumber: any;
    reviewsList: any;
    overall: any;
    communication: any;
    green_coffee: any;
    rate_rating: any;
    total_review: any;
    five_star: any;
    four_star: any;
    three_star: any;
    two_star: any;
    one_star: any;
    rate_rating_star: any;
    estate_origin: any;
    estate_region: any;
    farm_yield: any;
    availabilityImages: any;
    prebook_order_id: any = 0;
    prebook_flag: boolean = false;

    // Lot data
    polygonId: string;

    queryParams: any = new BehaviorSubject({
        origin: '',
        species: '',
        name: '',
        grade: '',
        crop_year: '',
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

    constructor(
        private http: HttpClient,
        public userService: UserserviceService,
        public globals: GlobalsService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
    ) {
        this.roaster_id = this.cookieService.get('roaster_id');
        this.getEstateCertificates();
    }

    // Estate detail apis
    estateDetailList() {
        this.userService.getAvailableEstateList(this.roaster_id, this.estateId).subscribe((res: any) => {
            if (res.success) {
                // console.log('EstateDetail', res.result);
                this.estate = res.result;
                this.name = res.result.name;
                this.description = res.result.description;
                this.total_area = res.result.total_area;
                this.altitude_start = res.result.altitude_start;
                this.altitude_end = res.result.altitude_end;
                this.crop_year_start = res.result.crop_year_start;
                this.crop_year_end = res.result.crop_year_end;
                this.location = res.result.location;
                this.processing_types = res.result.processing_types;
                this.soil_footprint = res.result.soil_footprint;
                this.temperature_range = res.result.temperature_range;
                this.packaging = res.result.packaging;
                this.other_crops = res.result.other_crops;
                this.wild_animals = res.result.wild_animals;
                this.gps_coordinates = res.result.gps_coordinates;
                this.founded_on = res.result.founded_on;
                this.annual_prod = res.result.total_production;
                this.coffee_production = res.result.coffee_production;
                this.owner_name = res.result.owner_name;
                this.grade_range = res.result.grade_range;
                this.rating = res.result.rating;
                this.agronomist_access = res.result.agronomist_access;
                this.number_of_trees = res.result.number_of_trees;
                this.city = res.result.state;
                this.country = res.result.country;
                this.varieties = res.result.varieties;
                this.estate_region = res.result.region;
                this.farm_yield = res.result.farm_yield;
                if (this.gps_coordinates) {
                    this.coordinates = this.gps_coordinates.split(',');
                    this.latitude = parseFloat(this.coordinates[0].slice(0, -3));
                    this.longitude = parseFloat(this.coordinates[1].slice(0, -3));
                } else {
                    this.emptyCoord = this.gps_coordinates;
                }
                const country = this.globals.getCountry(this.country.toUpperCase());
                this.countryName = country ? country.name : this.country.toUpperCase();
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
                // console.log('Home page:', this.estateHomepage);
            }
        });
    }

    getEstateAboutUs() {
        this.userService.getEstateBrandProfileDetail(this.estateId, 'about-us').subscribe((res: any) => {
            if (res.success) {
                this.estateAboutUs = res.result;
                // console.log('About Us:', this.estateAboutUs);
            }
        });
    }

    estateEmployees() {
        this.userService.getEstateContacts(this.estateId).subscribe((res: any) => {
            if (res.success) {
                this.estateContacts = res.result;
                // console.log('estateContacts: ', this.estateContacts);
            }
        });
    }

    getLotsList() {
        this.userService.getavailableLots(this.roaster_id, this.estateId).subscribe((res: any) => {
            if (res.success) {
                this.estateLots = res.result;
                // console.log('Lots:', this.estateLots);
                this.estateLots.forEach((element) => {
                    element.varietiesStr = _.pluck(element.varieties, 'name').join(', ');
                    element.speciesStr = _.pluck(element.varieties, 'species').join(', ');
                    if (element.polygon_coordinates) {
                        element.polygon_coordinates = JSON.parse(element.polygon_coordinates);
                        element.center = element.polygon_coordinates[0][0];
                    }
                });
            }
        });
    }

    getGreenCoffee() {
        this.userService.getGreenCoffee(this.roaster_id, this.estateId).subscribe((res: any) => {
            if (res.success) {
                this.estateGreenList = res.result;
                // console.log('Green Coffee:', this.estateGreenList);
            }
        });
    }

    estateGalleryFiles() {
        this.userService.getEstateGallery(this.estateId).subscribe((res: any) => {
            if (res.success) {
                this.estateGalleryImages = res.result;
                // console.log('Gallary:', this.estateGalleryImages);
            }
        });
    }

    getEstateReviews() {
        this.userService.getEachEsateReviews(this.estateId).subscribe((res: any) => {
            if (res.success) {
                this.reviewsList = res.result;
                console.log('Reviews', this.reviewsList);
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
                console.log('Review Summary: ', this.estateReviewsSummary);
                // this.overall = this.estateReviewsSummary.average.overall_experience;
                // this.communication = this.estateReviewsSummary.average.communication;
                // this.green_coffee = this.estateReviewsSummary.average.green_coffee;
                // this.rate_rating = parseFloat(this.estateReviewsSummary.summary.rating).toFixed(1);
                // this.rate_rating_star = this.estateReviewsSummary.summary.rating;
                // this.total_review = this.estateReviewsSummary.summary.total_review;
                // this.five_star = this.estateReviewsSummary.summary['5_star'];
                // this.four_star = this.estateReviewsSummary.summary['4_star'];
                // this.three_star = this.estateReviewsSummary.summary['3_star'];
                // this.two_star = this.estateReviewsSummary.summary['2_star'];
                // this.one_star = this.estateReviewsSummary.summary['1_star'];
            }
        });
    }

    // Harvest detail apis
    availableDetailList(resolve: any = null) {
        this.userService.getGreenCoffeeDetails(this.roaster_id, this.harvestData).subscribe((res: any) => {
            if (res.success) {
                this.harvestDetail = res.result;
                this.available_name = res.result.name;
                this.available_estate_name = res.result.estate_name;
                this.lot_id = res.result.lot_id;
                this.region = res.result.region;
                this.about = res.result.about;
                this.price = res.result.price;
                this.price_unit = res.result.price_unit;
                this.quantity_count = res.result.quantity_count;
                this.quantity_type = res.result.quantity_type;
                this.quantity = res.result.quantity;
                this.quantity_unit = res.result.quantity_unit;
                this.cup_score = res.result.cupping.cup_score;
                this.cupped_at = res.result.cupping.cupped_at;
                this.date_cupped = new DatePipe('en-Us').transform(this.cupped_at, 'MMM d, y', 'GMT+5:30');
                this.evaluator_dp_thumb = res.result.cupping.evaluator_dp_thumb;
                this.availabilty_variety = res.result.varieties;
                this.availability_species = res.result.species;
                this.evaluator_name = res.result.cupping.evaluator_name;
                this.harvest_date = res.result.harvest_date;
                this.flavours = res.result.flavours;
                this.max_altitude_coffee = res.result.max_altitude;
                this.min_altitude_coffee = res.result.min_altitude;
                this.shipping_to = res.result.shipping_to;
                this.ico_number = res.result.incoterm;
                this.initial_quantity = res.result.initial_quantity;
                this.state = res.result.state;
                this.type = res.result.type;
                this.listing_status = res.result.listing_status;
                this.wet_process = res.result.wet_milling.process;
                this.wet_fermentation = res.result.wet_milling.fermentation;
                this.dry_period = res.result.dry_milling.drying_period;
                this.dry_process = res.result.dry_milling.process;
                this.dry_water_activity = res.result.dry_milling.water_activity;
                this.dry_moisture_content = res.result.dry_milling.moisture_content;
                this.packaging = res.result.packaging;
                this.estate_rating = res.result.estate_rating;
                this.images = res.result.images;
                this.estate_id = res.result.estate_id;
                this.availabilityImages = res.result.images;
                console.warn(res.result);
                this.getLotDetails();
            }
            if (resolve) {
                resolve();
            }
        });
    }

    getLotDetails() {
        this.userService.getRoasterLotDetails(this.roaster_id, this.estate_id, this.lot_id).subscribe((res: any) => {
            if (res.success === true) {
                this.polygonId = res.result.polygon_id;
            }
        });
    }

    otherAvailableCoffee() {
        this.userService.getGreenCoffee(this.roaster_id, this.estateNumber).subscribe((res: any) => {
            if (res.success) {
                this.otherGreenList = res.result;
                console.log('Other green coff:', this.otherGreenList);
            }
        });
    }

    getEachGreenCertify() {
        this.userService.getEachEsateCertificates(this.estateNumber).subscribe((res: any) => {
            if (res.success) {
                this.availableCertify = res.result;
                console.log('Certify', this.reviewsList);
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
