import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CroppedImage } from '@models';
import { DialogService } from 'primeng/dynamicdialog';
import { CropperDialogComponent } from '../../cropper-dialog/cropper-dialog.component';

@Component({
    selector: 'app-upload-avatar',
    templateUrl: './upload-avatar.component.html',
    styleUrls: ['./upload-avatar.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UploadAvatarComponent),
            multi: true,
        },
    ],
})
export class UploadAvatarComponent implements OnInit, ControlValueAccessor {
    @Input() size = 90;
    @Input() deletable = false;

    file: any;

    onChange: any;
    onTouched: any;

    writeValue(value: any): void {
        this.file = value;
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    constructor(private dialogService: DialogService) {}

    ngOnInit(): void {}

    handleFile(event: any) {
        if (!event.target.files?.length) {
            return;
        }
        this.dialogService
            .open(CropperDialogComponent, {
                data: {
                    imageChangedEvent: event,
                    resizeToWidth: 256,
                    resizeToHeight: 256,
                    roundCropper: true,
                },
            })
            .onClose.subscribe((data: CroppedImage) => {
                if (data?.status) {
                    this.file = { ...this.file, file: data.croppedImgFile, url: data.croppedImgUrl };
                    this.onChange(this.file);
                }
            });
    }

    deletePhoto() {
        delete this.file.file;
        delete this.file.url;
        this.onTouched();
        this.onChange(this.file);
    }
}
