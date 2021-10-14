import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RouterService } from '@services';

@Component({
    selector: 'app-back-link',
    templateUrl: './back-link.component.html',
    styleUrls: ['./back-link.component.scss'],
})
export class BackLinkComponent implements OnInit {
    @Output() handleBack = new EventEmitter();
    @Input() defaultBackTo: string;
    @Input() title = this.translator.instant('back');

    constructor(
        private location: Location,
        private router: Router,
        private translator: TranslateService,
        private routerServie: RouterService,
    ) {}

    ngOnInit(): void {}

    onClick() {
        if (this.handleBack.observers.length) {
            this.handleBack.emit();
        } else if (this.routerServie.hasBack) {
            this.location.back();
        } else {
            this.router.navigate([this.defaultBackTo]);
        }
    }
}
