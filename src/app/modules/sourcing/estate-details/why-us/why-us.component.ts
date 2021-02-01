import { Component, OnInit } from '@angular/core';
import { Gallery, ImageItem, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { GlobalsService } from 'src/services/globals.service';
import { SourcingService } from '../../sourcing.service';

@Component({
    selector: 'app-why-us',
    templateUrl: './why-us.component.html',
    styleUrls: ['./why-us.component.scss'],
})
export class WhyUsComponent implements OnInit {
    constructor(
        public gallery: Gallery,
        public lightbox: Lightbox,
        public globals: GlobalsService,
        public sourcing: SourcingService,
    ) {}

    ngOnInit(): void {}

    openPicture(src) {
        const items = [new ImageItem({ src, thumb: src })];
        const lightboxRef = this.gallery.ref('lightbox');
        lightboxRef.setConfig({
            imageSize: ImageSize.Cover,
            thumb: false,
        });
        lightboxRef.load(items);
        this.lightbox.open(0);
    }
}
