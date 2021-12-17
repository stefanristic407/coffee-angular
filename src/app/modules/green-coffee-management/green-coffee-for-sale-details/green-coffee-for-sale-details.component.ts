import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, RoasterService } from '@services';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';

@Component({
    selector: 'app-green-coffee-for-sale-details',
    templateUrl: './green-coffee-for-sale-details.component.html',
    styleUrls: ['./green-coffee-for-sale-details.component.scss'],
})
export class GreenCoffeeForSaleDetailsComponent implements OnInit {
    loading = false;
    items: GalleryItem[];
    orderDetails: any;
    orderID: any = '';
    saleInformation: any;
    breadItems: any = [];
    selectedTab = 0;
    roasterNotes: any = [];

    constructor(private gallery: Gallery, private roasterService: RoasterService, private route: ActivatedRoute) {
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
        this.getData();
    }

    refreshBreadcrumb() {
        this.breadItems = [
            { label: 'Home', routerLink: '/' },
            { label: 'Inventory' },
            { label: 'Green coffee Inventory', routerLink: '/green-coffee-management/green-coffee-inventory' },
            {
                label: 'Marked for sale',
                routerLink: `/green-coffee-management/green-coffee-inventory`,
                queryParams: { markSale: 'yes' },
            },
            { label: this.saleInformation.name ? this.saleInformation.name : '' },
        ];
    }

    getData() {
        const promises = [];
        promises.push(new Promise((resolve, reject) => this.getSaleOrderDetails(resolve, reject)));
        promises.push(new Promise((resolve, reject) => this.getProcuredOrderDetails(resolve, reject)));
        this.loading = true;
        Promise.all(promises)
            .then(() => {
                this.loading = false;
            })
            .catch(() => (this.loading = false));
        this.getRoasterNotes();
    }

    getSaleOrderDetails(resolve, reject) {
        this.roasterService.getMarkForSaleDetails(this.orderID).subscribe(
            (response) => {
                if (response.success && response.result) {
                    this.saleInformation = response.result;
                    this.refreshBreadcrumb();
                }
                resolve();
            },
            (err) => {
                console.log(err);
                reject();
            },
        );
    }

    getProcuredOrderDetails(resolve, reject) {
        this.roasterService.getProcuredOrderDetails(this.orderID).subscribe(
            (response) => {
                if (response.success && response.result) {
                    this.orderDetails = response.result;
                    if (this.orderDetails && this.orderDetails.harvest_id) {
                        this.getGCAvailableDetails(this.orderDetails.harvest_id);
                    }
                }
                resolve();
            },
            (err) => {
                console.log(err);
                reject();
            },
        );
    }

    getGCAvailableDetails(harvestID) {
        this.roasterService.getGCAvailableDetails(harvestID).subscribe(
            (response) => {
                if (response && response.success && response.result) {
                    const result = response.result;
                    this.orderDetails.availability_name = result.name;
                    this.orderDetails.harvest_year_end = result.harvest_year_end;
                    this.orderDetails.harvest_year_start = result.harvest_year_start;
                    this.orderDetails.altitude = result.min_altitude + '-' + result.max_altitude;
                    this.orderDetails.flavours = result.flavours.map((item) => item.name).join(', ');
                    this.orderDetails.wet_mill = result.wet_milling.name;
                    this.orderDetails.processing = result.wet_milling.process + ',' + result.dry_milling.process;
                    this.orderDetails.moisture = result.dry_milling.moisture_content;
                    this.orderDetails.images = result.images;
                    this.items = result.images.map(
                        (item) => new ImageItem({ src: item.url, thumb: item.thumb_url ? item.thumb_url : item.url }),
                    );
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }

    getRoasterNotes() {
        this.roasterService.getRoasterNotes(this.orderID).subscribe(
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
