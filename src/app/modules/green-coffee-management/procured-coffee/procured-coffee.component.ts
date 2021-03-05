import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { GlobalsService } from '@core/services/globals.service';
import { RoasterserviceService } from '@core/services/api/roaster.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-procured-coffee',
    templateUrl: './procured-coffee.component.html',
    styleUrls: ['./procured-coffee.component.scss'],
})
export class ProcuredCoffeeComponent implements OnInit {
    items: GalleryItem[];
    appLanguage?: any;
    procuredActive: any = 0;
    orderID: any = '';
    roasterID: any = '';
    orderDetails: any;
    breadItems: any = [];
    selectedTab = 0;
    roasterNotes: any = [];
    saleInformation: any;
    constructor(
        public gallery: Gallery,
        public lightbox: Lightbox,
        public globals: GlobalsService,
        public route: ActivatedRoute,
        private router: Router,
        public roasterService: RoasterserviceService,
        public cookieService: CookieService,
    ) {
        this.roasterID = this.cookieService.get('roaster_id');
        this.route.params.subscribe((params) => {
            this.orderID = params.orderId;
        });
        this.breadItems = [
            { label: 'Home', routerLink: '/roaster-dashboard' },
            { label: 'Inventory' },
            { label: 'Green coffee management', routerLink: '/green-coffee-management/green-coffee-inventory' },
            { label: `Order #${this.orderID}` },
        ];
    }
    ngOnInit(): void {
        const lightboxRef = this.gallery.ref('lightbox');
        lightboxRef.setConfig({
            imageSize: ImageSize.Cover,
            thumbPosition: ThumbnailsPosition.Top,
        });
        lightboxRef.load(this.items);
        this.language();
        this.getOrderDetails();
        this.getRoasterNotes();
        this.getSaleOrderDetails();
    }
    getOrderDetails() {
        this.roasterService.getProcuredCoffeeDetails(this.roasterID, this.orderID).subscribe(
            (response) => {
                console.log(response);
                if (response.success && response.result) {
                    this.orderDetails = response.result;
                    if (this.orderDetails && this.orderDetails.harvest_id) {
                        this.getGCAvailableDetails(this.orderDetails.harvest_id);
                    }
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
    getSaleOrderDetails() {
        this.roasterService.getMarkForSaleDetails(this.roasterID, this.orderID).subscribe(
            (response) => {
                console.log(response);
                if (response.success && response.result) {
                    this.saleInformation = response.result;
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
    getGCAvailableDetails(harvestID) {
        this.roasterService.getGCAvailableDetails(harvestID).subscribe(
            (response) => {
                if (response && response.success && response.result) {
                    const result = response.result;
                    this.orderDetails.availability_name = result.name;
                    this.orderDetails.cup_score = result.cupping.cup_score;
                    this.orderDetails.cupping_at = result.cupping.cupped_at;
                    this.orderDetails.evaluator_name = result.cupping.evaluator_name;
                    this.orderDetails.evaluator_dp_thumb = result.cupping.evaluator_dp_thumb;
                    this.orderDetails.altitude = result.min_altitude + '-' + result.max_altitude;
                    this.orderDetails.flavour_profile = result.flavours;
                    this.orderDetails.wet_mill = result.wet_milling.name;
                    this.orderDetails.processing = result.processing_types;
                    this.orderDetails.images = result.images;
                    this.orderDetails.available_quantity = result.quantity;
                    this.orderDetails.available_quantity_count = result.quantity_count;
                    this.orderDetails.available_quantity_unit = result.quantity_unit;
                    this.orderDetails.available_quantity_type = result.quantity_type;
                    this.orderDetails.buying_price = result.price;
                    this.orderDetails.buying_price_unit = result.price_unit;
                    this.items = result.images.map((item) => new ImageItem({ src: item.url, thumb: item.thumb_url }));
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
    getRoasterNotes() {
        this.roasterService.getRoasterNotes(this.roasterID, this.orderID).subscribe(
            (response) => {
                if (response && response.success && response.result) {
                    this.roasterNotes = response.result;
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
    language() {
        this.appLanguage = this.globals.languageJson;
        this.procuredActive++;
    }
    availabilityPage() {
        return `/sourcing/coffee-details/${this.orderDetails.estate_id}/${this.orderDetails.harvest_id}`;
    }
    viewReport() {
        this.roasterService.getCuppingReportDetails(this.orderDetails.harvest_id).subscribe(
            (res) => {
                if (res.success && res.result && res.result.url) {
                    const hiddenElement = document.createElement('a');
                    hiddenElement.href = res.result.url;
                    hiddenElement.target = '_blank';
                    hiddenElement.click();
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
}
