import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-product-image',
    templateUrl: './product-image.component.html',
    styleUrls: ['./product-image.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ProductImageComponent),
            multi: true,
        },
    ],
})
export class ProductImageComponent implements OnInit, ControlValueAccessor {
    @ViewChild('fileInput', { static: false }) fileInput;
    inputId = Math.random() * 1000;
    onChange: any;
    onTouched: any;
    file: any;
    fileIndex = null;
    @Input() accept = '*';

    writeValue(value: any): void {
        this.file = value;
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    constructor(private toastr: ToastrService) {}

    ngOnInit(): void {}

    fileChangeEvent(e: any) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const fsize = file.size;
            if (Math.round(fsize / 1024) >= 1024 * 10) {
                this.toastr.error('File too big, please select a file smaller than 10mb');
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (event) => {
                    const img = new Image();
                    img.src = window.URL.createObjectURL(file);
                    img.onload = () => {
                        if (img.naturalWidth >= 5000 || img.naturalHeight >= 5000) {
                            this.toastr.error(`Image should be 5000 x 5000 size`);
                        } else {
                            this.file = { ...this.file, file, image_url: reader.result };
                            this.onChange(this.file);
                        }
                        window.URL.revokeObjectURL(img.src);
                    };
                };
            }
            this.fileInput.nativeElement.value = '';
        }
    }

    delete() {
        delete this.file.file;
        delete this.file.image_url;
        this.onChange(this.file);
    }
}
