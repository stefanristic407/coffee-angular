import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { CropperDialogComponent } from '@shared';
import { CroppedImage } from '@models';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module';
import { ImageDrop } from 'quill-image-drop-module';
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);

@Component({
    selector: 'app-forum-editor',
    templateUrl: './forum-editor.component.html',
    styleUrls: ['./forum-editor.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ForumEditorComponent),
            multi: true,
        },
    ],
})
export class ForumEditorComponent implements OnInit, ControlValueAccessor {
    readonly imgRex: RegExp = /<img.*?src="(.*?)"[^>]*>/g;
    readonly base64Rex: RegExp = /data:image\/[a-z]*;base64,[^"]+/g;

    onChange: any;
    onTouched: any;

    content: string;
    modules = {};

    @Input() isUploadingImage = false;
    @Output() isUploadingImageChange = new EventEmitter<boolean>();
    @Input() imageIdList = [];
    @Output() imageIdListChange = new EventEmitter<any>();
    @Input() fileModule = 'qa-forum';
    refreshEditor = false; // To refresh placeholder
    placeholderStr: string;
    @Input('placeholder')
    set placeholder(value) {
        this.placeholderStr = value;
        console.log(this.placeholderStr);
        this.refreshEditor = true;
        setTimeout(() => (this.refreshEditor = false), 200);
    }
    @Input() height = 213;
    @Input() images = [];
    imagesCount = 0;

    writeValue(value: string): void {
        this.content = value;
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    constructor(
        public location: Location,
        public dialogService: DialogService,
        private coffeeLabService: CoffeeLabService,
        private toastrService: ToastrService,
        public authService: AuthService,
    ) {
        this.modules = {
            imageResize: {
                modules: ['Resize', 'DisplaySize'],
            },
            imageDrop: true,
        };
    }

    ngOnInit(): void {
        if (this.images?.length) {
            this.imagesCount = this.images.length;
            this.imageIdList = this.images.map((item: any) => item.id);
            this.emitImagesChange();
        } else {
            this.images = [];
        }
    }

    onChangeContent(): void {
        this.onChange(this.content);
        const lastUploadedImage = this.getLastUploadedImage();
        if (lastUploadedImage) {
            this.handleUploadImage(lastUploadedImage);
        }
    }

    handleUploadImage(imageURL: string): void {
        this.dialogService
            .open(CropperDialogComponent, {
                data: {
                    imageBase64: imageURL,
                    maintainAspectRatio: false,
                    resizeToWidth: 672,
                },
            })
            .onClose.subscribe((data: CroppedImage) => {
                if (data?.status) {
                    const images = this.getImages();
                    if (images.filter((item) => item === imageURL).length > 1) {
                        return;
                    }
                    const virtualId =
                        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                    this.images.push({
                        virtualId,
                    });
                    const file = data.croppedImgFile;
                    this.isUploadingImage = true;
                    this.isUploadingImageChange.emit(true);
                    this.coffeeLabService.uploadFile(file, this.fileModule).subscribe((res: any) => {
                        this.isUploadingImage = false;
                        this.isUploadingImageChange.emit(false);
                        if (res.success) {
                            this.content = this.content.replace(this.base64Rex, res.result.url);
                            this.onChange(this.content);
                            const imageIndex = this.images.findIndex((item: any) => item.virtualId === virtualId);
                            if (imageIndex !== -1) {
                                this.images[imageIndex].id = res.result.id;
                                this.images[imageIndex].url = res.result.url;
                                this.emitImagesChange();
                            }
                        } else {
                            this.content = this.content.replace(this.base64Rex, '');
                            this.imagesCount -= 1;
                            this.onChange(this.content);
                            this.toastrService.error('Error while upload image');
                        }
                    });
                } else {
                    this.content = this.content.replace(this.base64Rex, '');
                    this.imagesCount -= 1;
                    this.onChange(this.content);
                }
            });
    }

    getImages(): any {
        const images = [];
        let img;
        // tslint:disable-next-line:no-conditional-assignment
        while ((img = this.imgRex.exec(this.content)) !== null) {
            images.push(img[1]);
        }
        return images;
    }

    getLastUploadedImage(): any {
        const images = this.getImages();
        if (images.length === this.imagesCount) {
            return null;
        } else if (images.length < this.imagesCount) {
            this.images = this.images.filter((image: any) =>
                images.find((item) => item === image.url || item === image.file),
            );
            this.emitImagesChange();
            this.imagesCount -= 1;
            return null;
        } else {
            this.imagesCount += 1;
            return images.find((item) => item.includes('data:image'));
        }
    }

    emitImagesChange(): void {
        this.imageIdList = this.images.map((item: any) => item.id);
        this.imageIdListChange.emit(this.imageIdList);
    }
}
