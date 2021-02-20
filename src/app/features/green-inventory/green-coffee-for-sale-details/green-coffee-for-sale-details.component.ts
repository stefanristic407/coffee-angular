import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-green-coffee-for-sale-details',
    templateUrl: './green-coffee-for-sale-details.component.html',
    styleUrls: ['./green-coffee-for-sale-details.component.scss'],
})
export class GreenCoffeeForSaleDetailsComponent implements OnInit {
    // tslint:disable: variable-name
    items: GalleryItem[];
    appLanguage?: any;
    procuredActive: any = 0;
    roaster_id: any = '';
    orderDetails: any;
    orderID: any = '';
    saleInformation: any;
    public data = [];
    imageData: any = [];
    breadItems: any = [];
    selectedTab = 0;
    roasterNotes: any = [];
    constructor(
        public gallery: Gallery,
        public lightbox: Lightbox,
        public globals: GlobalsService,
        public route: ActivatedRoute,
        public roasterService: RoasterserviceService,
        public cookieService: CookieService,
        private router: Router,
    ) {
        this.roaster_id = this.cookieService.get('roaster_id');
        this.route.params.subscribe((params) => {
            this.orderID = params.orderId;
        });
    }

    ngOnInit(): void {
        const lightboxRef = this.gallery.ref('lightbox');
        lightboxRef.setConfig({
            imageSize: ImageSize.Cover,
            thumbPosition: ThumbnailsPosition.Top,
        });
        lightboxRef.load(this.items);
        this.language();
    }
    public refreshData() {
        this.breadItems = [
            { label: 'Home', routerLink: '/features/roaster-dashboard' },
            { label: 'Sourcing Module', routerLink: '/sourcing/estate-list' },
            { label: 'Green coffee Inventory', routerLink: '/features/green-coffee-inventory' },
            { label: 'Marked for sale' },
            { label: `Order #${this.saleInformation.name ? this.saleInformation.name : ''}` },
        ];
    }
    language() {
        this.appLanguage = this.globals.languageJson;
        this.procuredActive++;
        this.getSaleOrderDetails();
        this.getProcuredOrderDetails();
        this.getRoasterNotes();
    }
    getSaleOrderDetails() {
        this.roasterService.getMarkForSaleDetails(this.roaster_id, this.orderID).subscribe(
            (response) => {
                console.log(response);
                if (response.success && response.result) {
                    this.saleInformation = response.result;
                    this.refreshData();
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
    getProcuredOrderDetails() {
        this.roasterService.getProcuredCoffeeDetails(this.roaster_id, this.orderID).subscribe(
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
    getGCAvailableDetails(harvest_id) {
        this.roasterService.getGCAvailableDetails(harvest_id).subscribe(
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
                    this.items = result.images.map((item) => new ImageItem({ src: item.url, thumb: item.thumb_url }));
                }
                console.log(this.orderDetails);
            },
            (err) => {
                console.log(err);
            },
        );
    }
    getRoasterNotes() {
        this.roasterService.getRoasterNotes(this.roaster_id, this.orderID).subscribe(
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
