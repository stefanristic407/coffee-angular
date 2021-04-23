import { AfterViewInit, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CoffeeLabService } from '@services';
import selector from 'echarts/types/src/component/brush/selector';
import { ToastrService } from 'ngx-toastr';

declare class ClipboardItem {
    constructor(data: { [mimeType: string]: Blob });
}

@Component({
    selector: 'app-origin-post',
    templateUrl: './origin-post.component.html',
    styleUrls: ['./origin-post.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class OriginPostComponent implements OnInit, AfterViewInit {
    @Input() content: any;
    isCopyingImage = false;

    constructor(private coffeeLabService: CoffeeLabService, private toastrService: ToastrService) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        document.querySelectorAll('#origin-post img').forEach((item) => {
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
                this.toastrService.success('Successfully copied image');
            },
            (error) => {
                this.isCopyingImage = false;
                console.log('error while get blob file >>>>>>>>>>', error);
            },
        );
    }
}
