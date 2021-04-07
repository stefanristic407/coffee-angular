import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-health-check',
    templateUrl: './health-check.component.html',
})
export class HealthCheckComponent implements OnInit {
    readonly object: object = { status: '200 ok', message: 'ok' };
    constructor() {}

    ngOnInit(): void {}
}
