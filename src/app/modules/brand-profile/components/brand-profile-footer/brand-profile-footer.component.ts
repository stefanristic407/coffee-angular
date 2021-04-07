import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-brand-profile-footer',
    templateUrl: './brand-profile-footer.component.html',
    styleUrls: ['./brand-profile-footer.component.scss'],
})
export class BrandProfileFooterComponent implements OnInit {
    @Input() pageSlug: string;
    @Output() saveClick = new EventEmitter();
    roasterSlug: string;

    constructor(private cookieService: CookieService) {
        this.roasterSlug = this.cookieService.get('roasterSlug');
    }

    ngOnInit(): void {}

    savePageData() {
        this.saveClick.emit();
    }
}
