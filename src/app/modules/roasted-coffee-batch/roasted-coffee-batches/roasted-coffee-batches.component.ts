import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-roasted-coffee-batches',
    templateUrl: './roasted-coffee-batches.component.html',
    styleUrls: ['./roasted-coffee-batches.component.scss'],
})
export class RoastedCoffeeBatchesComponent implements OnInit {
    breadItems = [
        { label: this.translator.instant('home'), routerLink: '/' },
        { label: this.translator.instant('inventory') },
        { label: this.translator.instant('menu_rc_inventory') },
    ];
    menuItems: MenuItem[] = [
        {
            label: this.translator.instant('roasted_coffee_batches'),
            routerLink: ['/roasted-coffee-batch/roasted-coffee-batches'],
        },
        {
            label: this.translator.instant('test_roast_batches'),
            routerLink: ['/roasted-coffee-batch/test-roast-batches'],
        },
    ];

    constructor(private translator: TranslateService) {}

    ngOnInit(): void {}
}
