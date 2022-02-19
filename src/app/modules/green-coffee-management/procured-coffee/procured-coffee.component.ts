import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { TranslateService } from '@ngx-translate/core';
import { ResizeService, RoasterService } from '@services';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';

@Component({
    selector: 'app-procured-coffee',
    templateUrl: './procured-coffee.component.html',
    styleUrls: ['./procured-coffee.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProcuredCoffeeComponent extends ResizeableComponent implements OnInit {
    items: GalleryItem[];
    isLoaded = false;
    orderID: any = '';
    orderDetails: any;
    breadItems: any = [];
    selectedTab = 0;
    roasterNotes: any = [];

    rows = 5;
    totalRecords = 0;
    tableColumns: any[];
    activityValue: any;

    constructor(
        private gallery: Gallery,
        private roasterService: RoasterService,
        private route: ActivatedRoute,
        private router: Router,
        private translator: TranslateService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
        this.route.params.subscribe((params) => {
            this.orderID = params.orderId;
        });
        this.breadItems = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('inventory') },
            {
                label: this.translator.instant('green_coffee_inventory'),
                routerLink: '/green-coffee-management/green-coffee-inventory',
            },
            {
                label: this.translator.instant('sourced_coffee'),
                routerLink: `/green-coffee-management/green-coffee-inventory`,
            },
            { label: `${this.translator.instant('order')} #${this.orderID}` },
        ];
    }

    initializeTableProcuredCoffee() {
        this.tableColumns = [
            {
                field: 'created_at',
                header: 'Date',
                width: 27,
            },
            {
                field: 'location',
                header: 'Location',
                width: 35,
            },
            {
                field: 'quantity',
                header: 'Quantity',
                width: 23,
            },
            this.resizeService.isMobile()
                ? null
                : {
                      field: 'actions',
                      header: 'Actions',
                      width: 20,
                  },
        ].filter(Boolean);
    }

    ngOnInit(): void {
        this.getActivityDetails();
        const lightboxRef = this.gallery.ref('lightbox');
        lightboxRef.setConfig({
            imageSize: ImageSize.Cover,
            thumbPosition: ThumbnailsPosition.Top,
        });
        lightboxRef.load(this.items);
        this.getOrderDetails();
        this.getRoasterNotes();
        this.initializeTableProcuredCoffee();
    }

    getOrderDetails() {
        this.isLoaded = false;
        this.roasterService.getProcuredOrderDetails(this.orderID).subscribe((response) => {
            if (response.success && response.result) {
                this.orderDetails = response.result;
                if (this.orderDetails && this.orderDetails.harvest_id) {
                    this.getGCAvailableDetails(this.orderDetails.harvest_id);
                }
                this.isLoaded = true;
            }
        });
    }

    getGCAvailableDetails(harvestID) {
        this.roasterService.getGCAvailableDetails(harvestID).subscribe((response) => {
            if (response && response.success && response.result) {
                const result = response.result;
                this.orderDetails.availability_name = result.name;
                this.orderDetails.cup_score = result.cupping.cup_score;
                this.orderDetails.cupping_at = result.cupping.cupped_at;
                this.orderDetails.dry_milling = result.dry_milling;
                this.orderDetails.dry_milling.moisture_content = this.orderDetails.dry_milling.moisture_content + '%';
                this.orderDetails.evaluator_name = result.cupping.evaluator_name;
                this.orderDetails.evaluator_dp_thumb = result.cupping.evaluator_dp_thumb;
                this.orderDetails.altitude = result.min_altitude + '-' + result.max_altitude;
                this.orderDetails.flavour_profile = result.flavours.map((item) => item.name).join(', ');
                this.orderDetails.wet_mill = result.wet_milling.name;
                this.orderDetails.processing = result.wet_milling.process + ',' + result.dry_milling.process;
                this.orderDetails.images = result.images;
                this.orderDetails.available_quantity = result.quantity;
                this.orderDetails.available_quantity_count = result.quantity_count;
                this.orderDetails.available_quantity_unit = result.quantity_unit;
                this.orderDetails.available_quantity_type = result.quantity_type;
                this.orderDetails.buying_price = result.price;
                this.orderDetails.buying_price_unit = result.price_unit;
                this.items = result.images.map(
                    (item) => new ImageItem({ src: item.url, thumb: item.thumb_url ? item.thumb_url : item.url }),
                );
            }
        });
    }

    getRoasterNotes() {
        this.roasterService.getRoasterNotes(this.orderID).subscribe((response) => {
            if (response && response.success && response.result) {
                this.roasterNotes = response.result;
            }
        });
    }

    availabilityPage(data) {
        if (data.catalogue === 'OUTTAKE_ORDER') {
            this.router.navigateByUrl(`/outtake-orders/view-order/${data.catalogue_id}`);
        }
        if (data.catalogue === 'RO_BATCH') {
            const navigationExtras: NavigationExtras = {
                queryParams: {
                    batchId: data.catalogue_id ? data.catalogue_id : undefined,
                    ordId: data.gc_order_id ? data.gc_order_id : undefined,
                },
            };
            this.router.navigate(['/roasted-coffee-batch/new-roasted-batch'], navigationExtras);
        }
        if (data.catalogue === 'RO_GREEN_COFFEE') {
            this.router.navigateByUrl(`/green-coffee-management/green-coffee-for-sale-details/${data.gc_order_id}`);
        }
        if (data.catalogue === 'RO_GREEN_COFFEE_SAMPLE') {
            this.router.navigateByUrl(`/green-coffee-management/lot-sale?orderId=${data.gc_order_id}`);
        }
    }

    viewReport() {
        this.roasterService.getCuppingReportDetails(this.orderDetails.harvest_id).subscribe((res) => {
            if (res.success && res.result && res.result.url) {
                const hiddenElement = document.createElement('a');
                hiddenElement.href = res.result.url;
                hiddenElement.target = '_blank';
                hiddenElement.click();
            }
        });
    }

    getActivityDetails() {
        this.roasterService.getActivityDetails(this.orderID).subscribe((res: any) => {
            if (res.success) {
                this.activityValue = res.result;
                this.totalRecords = res.result.length;
            }
        });
    }
}
