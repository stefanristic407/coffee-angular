import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-brand-profile-footer',
    templateUrl: './brand-profile-footer.component.html',
    styleUrls: ['./brand-profile-footer.component.scss'],
})
export class BrandProfileFooterComponent implements OnInit {
    @Input() pageSlug: string;
    @Output() saveClick = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    savePageData() {
        this.saveClick.emit();
    }
}
