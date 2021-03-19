import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile-certificates-view',
    templateUrl: './profile-certificates-view.component.html',
    styleUrls: ['./profile-certificates-view.component.scss'],
})
export class ProfileCertificatesViewComponent implements OnInit {
    roasterId: any;
    userId: any;
    @Input() certificationArray;
    isLoading?: boolean;

    constructor() {}

    ngOnInit(): void {}
}
