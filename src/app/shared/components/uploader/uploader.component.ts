import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    @Input() accept = '*';

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

    constructor(private toastrService: ToastrService) {}

    ngOnInit(): void {}

    fileChangeEvent(event: any) {
        const inputFiles = event.target.files;
        if (inputFiles?.length) {
            const cnt = inputFiles.length;
            const requiredFiles = this.count - this.files.length;
            if (this.count > 1 && cnt > requiredFiles) {
                this.toastrService.error(`Please select ${requiredFiles} files.`);
                return;
            }
            for (let idx = 0; inputFiles[idx]; idx++) {
                const file = inputFiles[idx];
                if (this.count > 1) {
                    if (this.fileIndex) {
                        this.files[this.fileIndex] = { file };
                    } else {
                        this.files = this.files.concat([{ file }]);
                    }
                    this.onChange(this.files);
                } else {
                    this.files = [{ file }];
                    this.onChange({ file });
                }
            }
            this.fileInput.nativeElement.value = '';
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

    showUploader() {
        return !(this.files?.length >= this.count);
    }
}
