import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services';

@Component({
    selector: 'app-dashboard-product',
    templateUrl: './dashboard-product.component.html',
    styleUrls: ['./dashboard-product.component.scss'],
})
export class DashboardProductComponent implements OnInit {
    constructor(public authService: AuthService) {}

    ngOnInit(): void {}
}
