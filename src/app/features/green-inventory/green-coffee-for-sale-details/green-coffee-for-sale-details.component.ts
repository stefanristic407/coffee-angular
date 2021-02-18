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
    items: GalleryItem[];
    appLanguage?: any;
    procuredActive: any = 0;
    roaster_id: any = '';
    orderDetails: any;
    orderID: any = '';
    saleInformation: any;
    public data = [];
    imageData: any = [];
    public coffeedata: any[] = [
        {
            estatename: 'Finca La Pampa',
            name: 'Organic washed Micro-lot',
            origin: 'Colombia',
            species: 'Bourbon',
            price: '$7.4 USD / kg',
            quantity: '287 bags',
            image: '/assets/images/sourcing-image1.jpg',
            score: '84.5',
        },
        {
            estatename: 'Gesha',
            name: 'Blend washed',
            origin: 'Colombia',
            species: 'Bourbon',
            price: '$5.53USD / kg',
            quantity: '297 bags',
            image: '/assets/images/sourcing-image3.jpg',
            score: '88',
        },
        {
            estatename: 'Finca La Toboba',
            name: 'FTO blend',
            origin: 'Ethopia',
            species: 'Bourbon',
            price: '$8.92 USD /kg',
            quantity: '567 bags',
            image: '/assets/images/sourcing-image7.jpg',
            score: '81.5',
        },
        // {  estatename: 'Asoproaaa', name: 'Mebratu', origin:'Brazil',species: 'Bourbon', price: '$7.4 USD / kg',quantity:'953 bags','image':'/assets/images/sourcing-image5.jpg',score:'85.4' },
        // {  estatename: 'Cafe Directo', name: 'FTO Semi washed', origin:'Ethopia',species: 'Bourbon', price: '$5.6 USD / kg',quantity:'110 bags','image':'/assets/images/sourcing-image4.jpg',score:'82' },
        // {  estatename: 'La Isabela', name: 'Blend1',origin:'Colombia', species: 'Bourbon', price: '$8.92 USD /kg',quantity:'450 bags','image':'/assets/images/sourcing-image8.jpg',score:'84' }
    ];
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
    language() {
        this.appLanguage = this.globals.languageJson;
        this.procuredActive++;
        this.getSaleOrderDetails();
        this.getProcuredOrderDetails();
    }
    getSaleOrderDetails() {
        this.orderID = decodeURIComponent(this.route.snapshot.queryParams['orderId']);
        this.roasterService.getMarkForSaleDetails(this.roaster_id, this.orderID).subscribe(
            (response) => {
                console.log(response);
                if (response['success'] && response['result']) {
                    this.saleInformation = response['result'];
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
    getProcuredOrderDetails() {
        this.orderID = decodeURIComponent(this.route.snapshot.queryParams['orderId']);
        this.roasterService.getProcuredCoffeeDetails(this.roaster_id, this.orderID).subscribe(
            (response) => {
                console.log(response);
                if (response['success'] && response['result']) {
                    this.orderDetails = response['result'];
                    if (this.orderDetails && this.orderDetails['harvest_id']) {
                        this.getGCAvailableDetails(this.orderDetails['harvest_id']);
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
                if (response && response['success'] && response['result']) {
                    const result = response['result'];
                    this.orderDetails['availability_name'] = result['name'];
                    this.orderDetails['cup_score'] = result['cupping']['cup_score'];
                    this.orderDetails['cupping_at'] = result['cupping']['cupped_at'];
                    this.orderDetails['altitude'] = result['min_altitude'] + '-' + result['max_altitude'];
                    this.orderDetails['flavour_profile'] = result['flavours'];
                    this.orderDetails['wet_mill'] = result['wet_milling']['name'];
                    this.orderDetails['processing'] = result['processing_types'];
                    this.orderDetails['images'] = result['images'];
                    this.items = result['images'].map(
                        (item) => new ImageItem({ src: item.url, thumb: item.thumb_url }),
                    );
                }
                console.log(this.orderDetails);
            },
            (err) => {
                console.log(err);
            },
        );
    }
    viewReport() {
        this.roasterService.getCuppingReportDetails(this.orderDetails['harvest_id']).subscribe(
            (res) => {
                if (res['success'] && res['result'] && res['result']['url']) {
                    var hiddenElement = document.createElement('a');
                    hiddenElement.href = res['result']['url'];
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
