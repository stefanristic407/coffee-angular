import { Component, EventEmitter, forwardRef, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Gallery, ImageItem, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { RoasterserviceService } from '@services';
import { UserserviceService } from '@services';

@Component({
    selector: 'app-uploader',
    templateUrl: './uploader.component.html',
    styleUrls: ['./uploader.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UploaderComponent),
            multi: true,
        },
    ],
})
export class UploaderComponent implements OnInit, ControlValueAccessor {
    onChange: any;
    onTouched: any;
    files: any[];
    @Input() multiple = false;

    writeValue(value: any): void {
        console.log('Write', value);
        if (this.multiple) {
            this.files = value;
        } else {
            this.files = [value];
        }
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    constructor(
        public gallery: Gallery,
        public lightbox: Lightbox,
        private roasterSrv: RoasterserviceService,
        private userService: UserserviceService,
    ) {}

    ngOnInit(): void {}

    fileChangeEvent(event: any) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            this.roasterSrv.uploadBrandProfile(file).subscribe(
                (res: any) => {
                    if (res.success) {
                        if (this.multiple) {
                            this.files = this.files.concat([res.result]);
                            this.onChange(this.files.concat([res.result]));
                        } else {
                            this.files = [res.result];
                            this.onChange(res.result);
                        }
                    }
                },
                (err: HttpErrorResponse) => {
                    console.log(err);
                },
            );
        }
    }

    delete(idx) {
        this.files.splice(idx, 1);
        console.log(idx, this.files);

        if (this.multiple) {
            this.onChange(this.files);
        } else {
            this.onChange(this.files[0] || null);
        }
    }

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
