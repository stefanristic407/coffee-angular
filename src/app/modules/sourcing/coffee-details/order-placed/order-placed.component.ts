import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
    selector: 'app-order-placed',
    templateUrl: './order-placed.component.html',
    styleUrls: ['./order-placed.component.scss'],
})
export class OrderPlacedComponent implements OnInit {
    appLanguage?: any;
    availableOrderActive: any = 0;

    constructor(public globals: GlobalsService) {}

    ngOnInit(): void {
        this.language();
    }
    language() {
        this.appLanguage = this.globals.languageJson;
        this.availableOrderActive++;
    }
}
