import { Component, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, PrimeTableService, RoasterserviceService, ResizeService } from '@services';
import { ResizeableComponent } from '@base-components';
import { Table } from 'primeng/table';

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
    roasterID: any = '';
    orderDetails: any;
    breadItems: any = [];
    selectedTab = 0;
    roasterNotes: any = [];
    originArray: any;
    termStatus: any;
    termOrigin: any;
    totalRecords = 0;
    public _form: FormGroup;
    activityValue: any;
    filterAtivity: any;
    first: any;
    @Input('form')
    set form(value: FormGroup) {
        this._form = value;
    }

    get form() {
        return this._form;
    }

    constructor(
        private authService: AuthService,
        private router: Router,
        private translator: TranslateService,
        protected resizeService: ResizeService,
        public gallery: Gallery,
        public lightbox: Lightbox,
        public primeTableService: PrimeTableService,
        public roasterService: RoasterserviceService,
        public route: ActivatedRoute,
    ) {
        super(resizeService);
        this.roasterID = this.authService.getOrgId();
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

    @ViewChild('activityLog', { static: true }) table: Table;
    public isMobile = false;

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.initializeTableProcuredCoffee();
    }
    initializeTableProcuredCoffee() {
        this.primeTableService.windowWidth = window.innerWidth;

        if (this.primeTableService.windowWidth <= this.primeTableService.responsiveStartsAt) {
            this.primeTableService.isMobileView = true;
            this.primeTableService.allColumns = [
                {
                    field: 'created_at',
                    header: 'Date',
                    sortable: false,
                },
                {
                    field: 'location',
                    header: 'Location',
                    sortable: false,
                },
                {
                    field: 'quantity',
                    header: 'quantity',
                    sortable: false,
                },
            ];
        } else {
            this.primeTableService.isMobileView = false;
            this.primeTableService.allColumns = [
                {
                    field: 'created_at',
                    header: 'Date',
                    sortable: false,
                },
                {
                    field: 'location',
                    header: 'Location',
                    sortable: false,
                },
                {
                    field: 'quantity',
                    header: 'Quantity',
                    sortable: false,
                },
                {
                    field: 'actions',
                    header: 'Actions',
                    sortable: false,
                },
            ];
        }
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
        this.primeTableService.form = this.form;
        this.primeTableService.form?.valueChanges.subscribe((data) =>
            setTimeout(() => {
                this.table.reset();
            }, 100),
        );
    }

    getOrderDetails() {
        this.isLoaded = false;
        this.roasterService.getProcuredCoffeeDetails(this.roasterID, this.orderID).subscribe(
            (response) => {
                if (response.success && response.result) {
                    this.orderDetails = response.result;
                    if (this.orderDetails && this.orderDetails.harvest_id) {
                        this.getGCAvailableDetails(this.orderDetails.harvest_id);
                    }
                    this.isLoaded = true;
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
                    this.orderDetails.dry_milling = result.dry_milling;
                    this.orderDetails.dry_milling.moisture_content =
                        this.orderDetails.dry_milling.moisture_content + '%';
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
            this.router.navigateByUrl(`/green-coffee-management/green-coffee-for-sale-details/${data.catalogue_id}`);
        }
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

    getActivityDetails() {
        this.roasterService.getActivityDetails(this.roasterID, this.orderID).subscribe((res: any) => {
            if (res.success) {
                this.filterAtivity = res.result;
                this.activityValue = this.filterAtivity.slice(0, 5);
                this.totalRecords = res.result.length;
            }
        });
    }

    paginate(event: any) {
        this.activityValue = this.filterAtivity.slice(event.first, event.first + 5);
    }
}
