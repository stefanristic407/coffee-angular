import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { COUNTRY_LIST } from '@constants';
import { AvailabilityStatus, HarvestType } from '@enums';
import { AuthService, ResizeService } from '@services';
import { getContinentName, getCountry } from '@utils';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { SourcingService } from '../sourcing.service';

@Component({
    selector: 'app-coffee-details',
    templateUrl: './coffee-details.component.html',
    styleUrls: ['./coffee-details.component.scss'],
})
export class CoffeeDetailsComponent extends ResizeableComponent implements OnInit {
    readonly AvailabilityStatus = AvailabilityStatus;
    readonly HarvestType = HarvestType;
    items: GalleryItem[];
    isLoaded = false;
    buyable = false;
    shippingTo: string;

    constructor(
        private authService: AuthService,
        private gallery: Gallery,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        protected resizeService: ResizeService,
        public sourcing: SourcingService,
    ) {
        super(resizeService);
        this.route.paramMap.subscribe((params) => {
            if (params.has('harvestId')) {
                this.sourcing.harvestId = +params.get('harvestId');
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
                this.buyable =
                    this.sourcing.harvestDetail &&
                    this.sourcing.harvestDetail.minimum_purchase_quantity <=
                        this.sourcing.harvestDetail.quantity_count &&
                    this.sourcing.harvestDetail.shipping_to.find(
                        (ix) => ix.toLowerCase() === this.authService.currentOrganization.country.toLowerCase(),
                    );

                const optionItems = _.groupBy(COUNTRY_LIST, 'continent');
                const countries = (this.sourcing.harvestDetail.shipping_to || []).map((ix) => getCountry(ix));
                const groupedCountries = _.chain(_.groupBy(countries, 'continent'))
                    .map((item, key) => {
                        return {
                            continent: key,
                            items: item,
                            totalCnt: item.length,
                        };
                    })
                    .value();

                const continents = groupedCountries
                    .filter((item) => item.totalCnt === optionItems[item.continent].length)
                    .map((item) => item.continent);
                const individualCountries = countries.filter((ix) => continents.indexOf(ix.continent) < 0);

                this.shippingTo = [
                    ...continents.map((item) => getContinentName(item)),
                    ...individualCountries.map((item) => item.name),
                ].join(', ');

                this.galleryImages();
                this.sourcing.estateId = this.sourcing.harvestDetail.estate_id;
                this.sourcing.estateDetailList();
                this.sourcing.getEachEstateCertify();

                this.sourcing.lotId = this.sourcing.harvestDetail.lot_id;
                this.sourcing.getLotDetails();

                this.sourcing.otherAvailableCoffee();
                this.isLoaded = true;
            })
            .catch((err) => {
                this.toastrService.error('Error while retrieving data');
                this.router.navigateByUrl('/sourcing/coffee-list');
            });
    }

    galleryImages() {
        const images = [];
        if (this.sourcing.harvestDetail?.images) {
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
