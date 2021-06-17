import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';

declare class ClipboardItem {
    constructor(data: { [mimeType: string]: Blob });
}

@Directive({
    selector: '[appCopyImageToClipboard]',
})
export class CopyImageToClipboardDirective implements AfterViewInit {
    isCopyingImage = false;

    constructor(
        private el: ElementRef,
        private coffeeLabService: CoffeeLabService,
        private toastrService: ToastrService,
    ) {}

    ngAfterViewInit(): void {
        this.el.nativeElement.querySelectorAll('img').forEach((imgElement) => {
            imgElement.parentElement.classList.add('clipboard-img-p');
            imgElement.parentElement.addEventListener('click', (event) => {
                if (event?.target?.tagName !== 'IMG' && !this.isCopyingImage) {
                    this.onCopyImageToClipboard(event.target.children[0]);
                }
            });
        });
    }

    convertBlobToImage(blob: any): any {
        return new Promise((resolve) => {
            const url = URL.createObjectURL(blob);
            const img = new Image();
            img.onload = () => {
                URL.revokeObjectURL(url);
                resolve(img);
            };
            img.src = url;
        });
    }

    async onCopyImageToClipboard(selectedImgElement: HTMLImageElement) {
        this.isCopyingImage = true;
        this.el.nativeElement.classList.add('copying-image');
        const url = selectedImgElement.src;
        this.coffeeLabService.getFileBlob(url).subscribe(
            async (blob: any) => {
                console.log(blob);
                const convertedImage = await this.convertBlobToImage(blob);
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = convertedImage.naturalWidth;
                canvas.height = convertedImage.naturalHeight;
                ctx.drawImage(convertedImage, 0, 0);
                const pngDataURI = canvas.toDataURL('image/png');
                const pngBlob = this.coffeeLabService.dataURItoBlob(pngDataURI);
                const data = [new ClipboardItem({ [pngBlob.type]: pngBlob })];
                // @ts-ignore
                navigator.clipboard.write(data);
                this.isCopyingImage = false;
                this.el.nativeElement.classList.remove('copying-image');
                this.toastrService.success('Successfully copied image');
            },
            (error) => {
                this.isCopyingImage = false;
                this.el.nativeElement.classList.remove('copying-image');
                console.log('error while get blob file >>>>>>>>>>', error);
            },
        );
    }
}
