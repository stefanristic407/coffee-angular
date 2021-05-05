import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService, CoffeeLabService, FileService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-forum-editor',
    templateUrl: './forum-editor.component.html',
    styleUrls: ['./forum-editor.component.scss'],
})
export class ForumEditorComponent implements OnInit {
    @Input() content: string;
    @Output() contentChange = new EventEmitter<string>();
    @Input() isUploadingImage = false;
    @Output() isUploadingImageChange = new EventEmitter<boolean>();
    @Input() imageIdList = [];
    @Output() imageIdListChange = new EventEmitter<any>();
    @Input() fileModule = 'qa-forum';
    @Input() placeholder: string;
    @Input() height;
    @Input() images = [];
    imagesCount = 0;

    constructor(
        public location: Location,
        public dialogService: DialogService,
        private coffeeLabService: CoffeeLabService,
        private toastrService: ToastrService,
        public authService: AuthService,
    ) {
        if (!this.height) {
            this.height = 213;
        }
    }

    ngOnInit(): void {
        this.imagesCount = this.images?.length;
        this.imageIdList = this.images.map((item: any) => item.id);
        this.emitImagesChange();
        console.log('images >>>>>>>>>>', this.images);
    }

    onChangeContent(): void {
        this.contentChange.emit(this.content);
        const lastUploadedImage = this.getLastUploadedImage();
        if (lastUploadedImage) {
            this.handleUploadImage(lastUploadedImage);
        }
    }

    handleUploadImage(imageURL: string): void {
        const images = this.getImages();
        if (images.filter((item) => item === imageURL).length > 1) {
            return;
        }
        const virtualId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.images.push({
            virtualId,
        });
        const file = this.coffeeLabService.dataURItoBlob(imageURL);
        console.log('This is new images so lets upload this image through api', file);
        this.isUploadingImage = true;
        this.isUploadingImageChange.emit(true);
        this.coffeeLabService.uploadFile(file, this.fileModule).subscribe((res: any) => {
            this.isUploadingImage = false;
            this.isUploadingImageChange.emit(false);
            if (res.success) {
                this.content = this.content.replace(/data:image\/[a-z]*;base64,[^"]+/g, res.result.url);
                this.contentChange.emit(this.content);
                const imageIndex = this.images.findIndex((item: any) => item.virtualId === virtualId);
                if (imageIndex !== -1) {
                    this.images[imageIndex].id = res.result.id;
                    this.images[imageIndex].url = res.result.url;
                    this.emitImagesChange();
                }
            } else {
                this.toastrService.error('Error while upload image');
            }
        });
    }

    getImages(): any {
        const imgRex = /<img.*?src="(.*?)"[^>]*>/g;
        const images = [];
        let img;
        // tslint:disable-next-line:no-conditional-assignment
        while ((img = imgRex.exec(this.content)) !== null) {
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
            return images[images.length - 1];
        }
    }

    emitImagesChange(): void {
        this.imageIdList = this.images.map((item: any) => item.id);
        this.imageIdListChange.emit(this.imageIdList);
    }
}
