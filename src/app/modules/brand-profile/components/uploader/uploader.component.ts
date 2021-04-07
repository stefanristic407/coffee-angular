import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Gallery, ImageItem, ImageSize } from 'ng-gallery';
import { ToastrService } from 'ngx-toastr';
import { Lightbox } from 'ng-gallery/lightbox';
import { RoasterserviceService } from '@services';
import { GlobalsService } from '@services';

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
    @ViewChild('fileInput', { static: false }) fileInput;
    inputId = Math.random() * 1000;
    onChange: any;
    onTouched: any;
    files: any[] = [];
    fileIndex = null;
    @Input() count = 1;
    @Input() type = 'all';
    @Input() width = null;
    @Input() height = null;
    acceptType: string;
    items = [
        {
            label: 'Edit',
            command: () => {
                this.fileInput.nativeElement.click();
            },
        },
        {
            label: 'Delete',
            command: () => {
                this.delete(this.fileIndex);
            },
        },
    ];

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
        private toastrService: ToastrService,
        private globalSrv: GlobalsService,
        private roasterSrv: RoasterserviceService,
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
            if (!file) {
                this.toastrService.error(`Please select the correct file`);
            }
            if (file.type.startsWith('image') && (this.width || this.height)) {
                const reader = new FileReader();
                reader.onload = () => {
                    const img = new Image();
                    img.onload = () => {
                        if (
                            (this.width && this.width !== img.naturalWidth) ||
                            (this.height && this.height !== img.naturalHeight)
                        ) {
                            this.toastrService.error(
                                `Image should be ${this.width || 'NA'} x ${this.height || 'NA'} size`,
                            );
                        } else {
                            this.upload(file);
                        }
                        window.URL.revokeObjectURL(img.src);
                    };
                    img.src = window.URL.createObjectURL(file);
                };
                reader.readAsDataURL(file);
            } else {
                this.upload(file);
            }
        }
    }

    upload(file) {
        this.roasterSrv.uploadBrandProfile(file).subscribe(
            (res: any) => {
                if (res.success) {
                    if (this.count > 1) {
                        if (this.fileIndex) {
                            this.files[this.fileIndex] = res.result;
                        } else {
                            this.files = this.files.concat([res.result]);
                        }
                        this.onChange(this.files);
                    } else {
                        this.files = JSON.parse(JSON.stringify([res.result]));
                        this.onChange(res.result);
                    }
                }
            },
            (err: HttpErrorResponse) => {
                console.log(err);
            },
        );
    }

    delete(idx) {
        this.files.splice(idx, 1);
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

    isVideo(url) {
        if (url) {
            const ext = url.split('.').pop();
            if (ext === 'mp4') {
                return true;
            }
        }
        return false;
    }

    showUploader() {
        if (this.globalSrv.device === 'mobile') {
            return !(this.files?.length >= this.count);
        } else {
            return !(this.count > 1 && this.files?.length >= this.count);
        }
    }
}
