import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService, ResizeService, UserService } from '@services';
import { SourcingService } from '../sourcing.service';
import { ResizeableComponent } from '@base-components';
import { PrebookStatus } from '@enums';

@Component({
    selector: 'app-lot-details',
    templateUrl: './lot-details.component.html',
    styleUrls: ['./lot-details.component.scss'],
})
export class LotDetailsComponent extends ResizeableComponent implements OnInit {
    imageItems: GalleryItem[];
    isLoaded = false;
    batchId: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public gallery: Gallery,
        public lightbox: Lightbox,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        protected resizeService: ResizeService,
        public sourcing: SourcingService,
        private userService: UserService,
    ) {
        super(resizeService);
        this.route.paramMap.subscribe((params) => {
            if (params.has('lotId') && params.has('estateId')) {
                this.sourcing.lotId = +params.get('lotId');
                this.sourcing.estateId = +params.get('estateId');
                this.refreshData();
            }
        });
    }

    ngOnInit(): void {}

    refreshData() {
        this.isLoaded = false;
        this.sourcing.harvestId = null;
        this.sourcing.polygonId = '';
        this.sourcing.harvestDetail = null;
        this.sourcing.estate = null;
        this.sourcing.lot = null;
        new Promise((resolve, reject) => this.sourcing.getLotDetails(resolve))
            .then(() => {
                this.galleryImages();
                this.getPrebookBatch();
                this.sourcing.estateDetailList();
                this.sourcing.otherAvailableCoffee();
                this.sourcing.getEachEstateCertify();
                this.isLoaded = true;
            })
            .catch(() => {
                this.toastrService.error('Error while retrieving data');
                this.router.navigateByUrl('/sourcing/coffee-list');
            });
    }

    galleryImages() {
        const images = [];
        if (this.sourcing.lot?.lot_images) {
            this.sourcing.lot?.lot_images.forEach((element) => {
                const sample = {
                    srcUrl: element.url,
                    previewUrl: element.thumb_url,
                };
                images.push(sample);
            });
        }
        this.imageItems = images.map((item) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
        const lightboxRef = this.gallery.ref('lightbox');
        lightboxRef.setConfig({
            imageSize: ImageSize.Cover,
            thumbPosition: ThumbnailsPosition.Top,
        });
        lightboxRef.load(this.imageItems);
    }

    getPrebookBatch() {
        const curDate: Date = new Date();
        const curYear = curDate.getFullYear();
        const year = curDate.getMonth() < this.sourcing.lot.harvest_start ? curYear : curYear + 1;
        this.userService
            .getPrebookBatchList(this.sourcing.estateId, this.sourcing.lotId, { year })
            .subscribe((res: any) => {
                if (res.success && res.result.length) {
                    if (res.result[0].prebook_status === PrebookStatus.Active) {
                        this.batchId = res.result[0].id;
                    }
                }
            });
    }

    checkPrebookable() {
        return this.sourcing.lot?.prebook_ready && this.batchId;
    }
}
