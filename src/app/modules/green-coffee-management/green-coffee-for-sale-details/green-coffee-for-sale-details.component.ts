import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-green-coffee-for-sale-details',
    templateUrl: './green-coffee-for-sale-details.component.html',
    styleUrls: ['./green-coffee-for-sale-details.component.scss'],
})
export class GreenCoffeeForSaleDetailsComponent implements OnInit {
    items: GalleryItem[];
    appLanguage?: any;
    procuredActive: any = 0;
    roasterID: any = '';
    orderDetails: any;
    orderID: any = '';
    saleInformation: any;
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
        this.roasterID = this.cookieService.get('roaster_id');
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
        console.log(this.items);
        this.language();
    }
    public refreshData() {
        this.breadItems = [
            { label: 'Home', routerLink: '/roaster-dashboard' },
            { label: 'Sourcing Module', routerLink: '/sourcing/estate-list' },
            { label: 'Green coffee Inventory', routerLink: '/green-coffee-management/green-coffee-inventory' },
            {
                label: 'Marked for sale',
                routerLink: `/green-coffee-management/green-coffee-inventory`,
                queryParams: { markSale: 'yes' },
            },
            { label: this.saleInformation.name ? this.saleInformation.name : '' },
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
        this.roasterService.getMarkForSaleDetails(this.roasterID, this.orderID).subscribe(
            (response) => {
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
        this.roasterService.getProcuredCoffeeDetails(this.roasterID, this.orderID).subscribe(
            (response) => {
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
    getGCAvailableDetails(harvestID) {
        this.roasterService.getGCAvailableDetails(harvestID).subscribe(
            (response) => {
                if (response && response.success && response.result) {
                    const result = response.result;
                    this.orderDetails.availability_name = result.name;
                    this.orderDetails.crop_year = result.harvest_date;
                    this.orderDetails.altitude = result.min_altitude + '-' + result.max_altitude;
                    this.orderDetails.flavours = result.flavours;
                    this.orderDetails.wet_mill = result.wet_milling.name;
                    this.orderDetails.processing = result.wet_milling.process + ',' + result.dry_milling.process;
                    this.orderDetails.moisture = result.dry_milling.moisture_content;
                    this.orderDetails.images = result.images;
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
