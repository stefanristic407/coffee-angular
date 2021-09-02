import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-tab-container',
    templateUrl: './tab-container.component.html',
    styleUrls: ['./tab-container.component.scss'],
})
export class TabContainerComponent implements OnInit {
    selectedIndex: number;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            const type = params.type || 'question';
            if (type === 'question') {
                this.selectedIndex = 0;
            }
            if (type === 'article') {
                this.selectedIndex = 1;
            }
            if (type === 'recipe') {
                this.selectedIndex = 2;
            }
        });
    }
}
