import { Component, OnInit } from '@angular/core';
import { UplaodService } from '@services';

@Component({
    selector: 'app-upload-info',
    templateUrl: './upload-info.component.html',
    styleUrls: ['./upload-info.component.scss'],
})
export class UploadInfoComponent implements OnInit {
    constructor(public uploadService: UplaodService) {}

    ngOnInit(): void {}
}
