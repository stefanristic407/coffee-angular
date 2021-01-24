import { Component, OnInit } from '@angular/core';
import { SourcingService } from '../sourcing.service';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { GlobalsService } from 'src/services/globals.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserserviceService } from '@services';
import { RoasterserviceService } from '@services';

@Component({
    selector: 'app-coffee-details',
    templateUrl: './coffee-details.component.html',
    styleUrls: ['./coffee-details.component.scss'],
})
export class CoffeeDetailsComponent implements OnInit {
    items: GalleryItem[];
    appLanguage?: any;
    isLoaded = false;
    brandProfileEstateWeb = 'https://qa-brand-profile.sewnstaging.com/estatebrandprofile/green-coffee';

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
    ];

    availableCertify: any;
    certiImage: any;
    certify: any;
    countryValue: any;
    flavourName: any;
    temperature: any;
    showTemperature = true;
    hourly: any;
    showHourly = true;

    constructor(
        public gallery: Gallery,
        public lightbox: Lightbox,
        public globals: GlobalsService,
        private route: ActivatedRoute,
        public sourcing: SourcingService,
        private router: Router,
        public userService: UserserviceService,
        private roasterService: RoasterserviceService,
    ) {
        this.route.paramMap.subscribe((params) => {
            console.log('params', params);
            if (params.has('harvestId') && params.has('estateId')) {
                this.sourcing.harvestData = params.get('harvestId');
                this.sourcing.estateNumber = params.get('estateId');
                this.refreshData();
            }
        });
    }

    ngOnInit(): void {
        this.language();
        this.temperature = '';
        this.hourly = '';
    }

    refreshData() {
        this.isLoaded = false;
        this.brandProfileEstateWeb = `https://qa-brand-profile.sewnstaging.com/estate/estate-${this.sourcing.estateNumber}/estatebrandprofile/green-coffee`;
        this.sourcing.polygonId = '';
        new Promise((resolve) => this.sourcing.availableDetailList(resolve)).then(() => {
            this.galleryImages();
            this.isLoaded = true;
        });
        this.sourcing.otherAvailableCoffee();
        this.sourcing.getEachGreenCertify();
    }

    language() {
        this.appLanguage = this.globals.languageJson;
    }

    getFlavourName(flavourid: any) {
        if (this.sourcing.flavourList) {
            this.flavourName = this.sourcing.flavourList.find((flavour) => flavour.id === flavourid).name;
            return this.flavourName;
        }
    }

    brandProfileSite() {
        const redirectUrl = this.brandProfileEstateWeb;
        this.roasterService.navigate(redirectUrl, true);
    }

    toggleTemperature() {
        this.showTemperature = !this.showTemperature;
        if (this.showTemperature === false) {
            document.getElementById('temperature_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('temperature_id').style.border = '1px solid #d6d6d6';
        }
    }

    setTemperature(data: any) {
        this.temperature = data;
    }

    toggleHourly() {
        this.showHourly = !this.showHourly;
        if (this.showHourly === false) {
            document.getElementById('hourly_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('hourly_id').style.border = '1px solid #d6d6d6';
        }
    }

    setHourly(data: any) {
        this.hourly = data;
    }

    getCertificateData(data: any) {
        //   console.log(data);
        if (data.certificate_type_id > 0) {
            this.certiImage = this.sourcing.finalCertify.filter((certify) => certify.id == data.certificate_type_id);
            if (this.certiImage !== '') {
                return this.certiImage[0].image_url;
            }
        }
    }

    galleryImages() {
        const images = [];
        if (this.sourcing.availabilityImages) {
            this.sourcing.availabilityImages.forEach((element) => {
                const sample = {
                    srcUrl: element.url,
                    previewUrl: element.thumb_url,
                };
                images.push(sample);
            });
        }
        this.items = images.map((item) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
        const lightboxRef = this.gallery.ref('lightbox');
        lightboxRef.setConfig({
            imageSize: ImageSize.Cover,
            thumbPosition: ThumbnailsPosition.Top,
        });
        lightboxRef.load(this.items);
    }
}
