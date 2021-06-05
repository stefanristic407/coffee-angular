import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-certificates',
    templateUrl: './certificates.component.html',
    styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {
    @Input() data: any;
    constructor() {}

    ngOnInit(): void {}
}
