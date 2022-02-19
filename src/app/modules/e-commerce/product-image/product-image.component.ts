import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { checkFile } from '@utils';
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
    changeDetection: ChangeDetectionStrategy.OnPush,
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
        this.cdr.detectChanges();
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    constructor(private toastr: ToastrService, private translator: TranslateService, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {}

    fileChangeEvent(e: any) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            checkFile(file, 10).subscribe((fileError) => {
                if (fileError) {
                    this.toastr.error(fileError.message);
                } else {
                    this.onChange(this.file);
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        this.file = { ...this.file, file, url: reader.result };
                        this.onChange(this.file);
                        this.cdr.detectChanges();
                    };
                }
            });
            e.target.value = '';
        }
    }

    delete() {
        delete this.file.file;
        delete this.file.url;
        this.onTouched();
        this.onChange(this.file);
        this.cdr.detectChanges();
    }

    getMenuItems() {
        return [
            {
                label: this.translator.instant('replace'),
                command: () => {
                    this.fileInput.nativeElement.click();
                },
            },
            {
                label: this.translator.instant('delete'),
                command: () => {
                    this.delete();
                },
            },
        ];
    }
}
