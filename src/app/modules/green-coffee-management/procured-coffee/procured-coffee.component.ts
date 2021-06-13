import { Component, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { AuthService, GlobalsService, PrimeTableService } from '@services';
import { RoasterserviceService, ResizeService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ResizeableComponent } from '@base-components';
import { Table } from 'primeng/table';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-procured-coffee',
    templateUrl: './procured-coffee.component.html',
    styleUrls: ['./procured-coffee.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProcuredCoffeeComponent extends ResizeableComponent implements OnInit {
    items: GalleryItem[];
    appLanguage?: any;
    procuredActive: any = 0;
    orderID: any = '';
    roasterID: any = '';
    orderDetails: any;
    breadItems: any = [];
    selectedTab = 0;
    roasterNotes: any = [];
    originArray: any;
    termStatus: any;
    termOrigin: any;
    // tslint:disable-next-line: variable-name
    public _form: FormGroup;
    @Input('form')
    set form(value: FormGroup) {
        this._form = value;
    }

    get form() {
        return this._form;
    }
    constructor(
        public gallery: Gallery,
        public lightbox: Lightbox,
        public globals: GlobalsService,
        public route: ActivatedRoute,
        private router: Router,
        public roasterService: RoasterserviceService,
        public cookieService: CookieService,
        protected resizeService: ResizeService,
        public primeTableService: PrimeTableService,
        private authService: AuthService,
    ) {
        super(resizeService);
        this.roasterID = this.authService.getOrgId();
        this.route.params.subscribe((params) => {
            this.orderID = params.orderId;
        });
        this.breadItems = [
            { label: 'Home', routerLink: '/roaster-dashboard' },
            { label: 'Inventory' },
            { label: 'Green coffee management', routerLink: '/green-coffee-management/green-coffee-inventory' },
            { label: 'Procured coffee', routerLink: `/green-coffee-management/green-coffee-inventory` },
            { label: `Order #${this.orderID}` },
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
                    field: 'date',
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
        const lightboxRef = this.gallery.ref('lightbox');
        lightboxRef.setConfig({
            imageSize: ImageSize.Cover,
            thumbPosition: ThumbnailsPosition.Top,
        });
        lightboxRef.load(this.items);
        this.language();
        this.getOrderDetails();
        this.getRoasterNotes();
        this.primeTableService.url = `/ro/${this.roasterID}/orders/${this.orderID}/activity-logs`;
        this.initializeTableProcuredCoffee();
        this.primeTableService.rows = 5;
        this.primeTableService.form = this.form;
        this.primeTableService.form?.valueChanges.subscribe((data) =>
            setTimeout(() => {
                this.table.reset();
            }, 100),
        );
        // this.primeTableService.isMarkedForSale = false;
    }

    getOrderDetails() {
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

    language() {
        this.appLanguage = this.globals.languageJson;
        this.procuredActive++;
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
}
