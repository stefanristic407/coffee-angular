import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService, ResizeService } from '@services';
import { SourcingService } from '../sourcing.service';
import { ResizeableComponent } from '@base-components';
import { CURRENCY_LIST } from '@constants';

@Component({
    selector: 'app-coffee-details',
    templateUrl: './coffee-details.component.html',
    styleUrls: ['./coffee-details.component.scss'],
})
export class CoffeeDetailsComponent extends ResizeableComponent implements OnInit {
    public readonly CURRENCY_LIST = CURRENCY_LIST;
    items: GalleryItem[];
    isLoaded = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public gallery: Gallery,
        public lightbox: Lightbox,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        protected resizeService: ResizeService,
        public sourcing: SourcingService,
    ) {
        super(resizeService);
        this.route.paramMap.subscribe((params) => {
            if (params.has('harvestId') && params.has('estateId')) {
                this.sourcing.harvestId = +params.get('harvestId');
                this.sourcing.estateId = +params.get('estateId');
                this.refreshData();
            }
        });
    }

    ngOnInit(): void {}

    refreshData() {
        this.isLoaded = false;
        this.sourcing.polygonId = '';
        this.sourcing.harvestDetail = null;
        this.sourcing.estate = null;
        this.sourcing.lot = null;
        new Promise((resolve, reject) => this.sourcing.availableDetailList(resolve, reject))
            .then(() => {
                this.galleryImages();
                this.isLoaded = true;
            })
            .catch(() => {
                this.toastrService.error('Error while retrieving data');
                this.router.navigateByUrl('/sourcing/coffee-list');
            });
        this.sourcing.estateDetailList();
        this.sourcing.otherAvailableCoffee();
        this.sourcing.getEachGreenCertify();
    }

    galleryImages() {
        const images = [];
        if (this.sourcing.harvestDetail?.images) {
            console.log(this.sourcing.harvestDetail.images);
            this.sourcing.harvestDetail?.images.forEach((element) => {
                const sample = {
                    srcUrl: element.url,
                    previewUrl: element.thumb_url || element.url,
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
