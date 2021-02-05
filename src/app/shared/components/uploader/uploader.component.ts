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
    inputId = Math.random() * 1000;
    onChange: any;
    onTouched: any;
    files: any[] = [];
    @Input() count = 1;
    @Input() type = 'all';
    acceptType: string;

    writeValue(value: any): void {
        if (value) {
            if (this.count > 1) {
                this.files = value;
            } else {
                this.files = [value];
            }
        } else {
            this.files = [];
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

    ngOnInit(): void {
        if (this.type === 'video') {
            this.acceptType = 'video/*';
        } else if (this.type === 'image') {
            this.acceptType = 'image/*';
        } else {
            this.acceptType = 'video/*,image/*';
        }
    }

    fileChangeEvent(event: any) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            this.roasterSrv.uploadBrandProfile(file).subscribe(
                (res: any) => {
                    if (res.success) {
                        if (this.count > 1) {
                            this.files = this.files.concat([res.result]);
                            this.onChange(this.files);
                        } else {
                            this.files = JSON.parse(JSON.stringify([res.result]));
                            this.onChange(res.result);
                            console.log('Wizard file:', res.result, this.files);
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

        if (this.count > 1) {
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
