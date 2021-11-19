import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ResizeableComponent } from '@base-components';
import { FileModule } from '@enums';
import { FileService, ResizeService } from '@services';
import { checkFile } from '@utils';
import * as moment from 'moment';
import { Gallery, ImageItem, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-brand-uploader',
    templateUrl: './brand-uploader.component.html',
    styleUrls: ['./brand-uploader.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BrandUploaderComponent),
            multi: true,
        },
    ],
})
export class BrandUploaderComponent extends ResizeableComponent implements OnInit, ControlValueAccessor {
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
    @Input() fileModule = FileModule.BrandProfile;
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
        private fileService: FileService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        if (this.type === 'file') {
            this.acceptType = '*';
        } else if (this.type === 'pdf') {
            this.acceptType = '.pdf';
        } else if (this.type === 'video') {
            this.acceptType = 'video/*';
        } else if (this.type === 'image') {
            this.acceptType = 'image/*';
        } else {
            this.acceptType = 'video/*,image/*';
        }
    }

    fileChangeEvent(event: any) {
        if (event.target.files?.length) {
            const cnt = event.target.files.length;
            const requiredFiles = this.count - this.files.length;
            if (this.count > 1 && cnt > requiredFiles) {
                this.toastrService.error(`Please select ${requiredFiles} files.`);
                return;
            }
            let promises = [];
            for (let idx = 0; event.target.files[idx]; idx++) {
                const file = event.target.files[idx];
                promises.push(
                    new Promise((resolve, reject) => {
                        checkFile(file).subscribe((res) => {
                            if (res) {
                                this.toastrService.error(res.message);
                                reject();
                            } else {
                                resolve(file);
                            }
                        });
                    }),
                );
            }

            Promise.all(promises)
                .then(() => {
                    promises = [];
                    for (let idx = 0; event.target.files[idx]; idx++) {
                        const file = event.target.files[idx];
                        const formData: FormData = new FormData();
                        formData.append('file', file, file.name);
                        formData.append('name', moment().format('YYYYMMDDHHmmss') + '.' + file.name.split('.').pop());
                        formData.append('file_module', this.fileModule);
                        promises.push(
                            new Promise((resolve, reject) => {
                                this.fileService.uploadFiles(formData).subscribe(
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
                                            resolve(res.success);
                                        } else {
                                            reject();
                                        }
                                    },
                                    (err) => {
                                        reject();
                                    },
                                );
                                event.target.value = '';
                            }),
                        );
                    }

                    Promise.all(promises)
                        .then(() => {
                            this.fileInput.nativeElement.value = '';
                        })
                        .catch(() => {
                            this.toastrService.error('Error while uploading');
                            this.fileInput.nativeElement.value = '';
                        });
                })
                .catch(() => {
                    this.fileInput.nativeElement.value = '';
                });
            promises = [];
        }
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
        if (this.resizeService.isMobile()) {
            return !(this.files?.length >= this.count);
        } else {
            return !(this.count > 1 && this.files?.length >= this.count);
        }
    }
}
