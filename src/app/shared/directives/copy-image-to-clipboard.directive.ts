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
    css =
        '.copy-image-to-clipboard-container img {cursor: pointer} .copy-image-to-clipboard-container img:hover{ opacity: 0.8 } .copying-image img { cursor: not-allowed !important }';
    style: any = document.createElement('style');

    constructor(
        private el: ElementRef,
        private coffeeLabService: CoffeeLabService,
        private toastrService: ToastrService,
    ) {}

    ngAfterViewInit(): void {
        if (this.style.styleSheet) {
            this.style.styleSheet.cssText = this.css;
        } else {
            this.style.appendChild(document.createTextNode(this.css));
        }
        this.el.nativeElement.classList.add('copy-image-to-clipboard-container');
        this.el.nativeElement.appendChild(this.style);
        this.el.nativeElement.querySelectorAll('img').forEach((item) => {
            item.addEventListener('click', (event) => {
                console.log('clicking image..........');
                if (!this.isCopyingImage) {
                    this.onCopyImageToClipboard(event);
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

    async onCopyImageToClipboard(event: any) {
        this.isCopyingImage = true;
        this.el.nativeElement.classList.add('copying-image');
        const selectedElement = event.target || event.currentTarget;
        const url = selectedElement.src;
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
