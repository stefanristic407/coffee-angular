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
    isLoaded = false;
    brandProfileEstateWeb = 'https://qa-brand-profile.sewnstaging.com/estatebrandprofile/green-coffee';

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
            if (params.has('harvestId') && params.has('estateId')) {
                this.sourcing.harvestData = params.get('harvestId');
                this.sourcing.estateNumber = params.get('estateId');
                this.refreshData();
            }
        });
    }

    ngOnInit(): void {}

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
