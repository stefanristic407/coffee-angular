import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile-certificates-view',
    templateUrl: './profile-certificates-view.component.html',
    styleUrls: ['./profile-certificates-view.component.scss'],
})
export class ProfileCertificatesViewComponent implements OnInit {
    @Input() certificationArray;

    constructor() {}

    ngOnInit(): void {}
}
