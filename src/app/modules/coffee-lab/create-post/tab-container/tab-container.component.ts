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
        const type = this.route.snapshot.queryParamMap.get('type') || 'question';
        if (type === 'question') {
            this.selectedIndex = 0;
        }
        if (type === 'recipe') {
            this.selectedIndex = 1;
        }
        if (type === 'article') {
            this.selectedIndex = 2;
        }
    }
}
