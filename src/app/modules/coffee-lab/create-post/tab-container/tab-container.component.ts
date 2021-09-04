import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-tab-container',
    templateUrl: './tab-container.component.html',
    styleUrls: ['./tab-container.component.scss'],
})
export class TabContainerComponent implements OnInit {
    selectedIndex: number;

    constructor(private route: ActivatedRoute, private router: Router) {}

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

    onTabChage(event) {
        let selectedType: string;
        if (event.index === 0) {
            selectedType = 'question';
        }
        if (event.index === 1) {
            selectedType = 'article';
        }
        if (event.index === 2) {
            selectedType = 'recipe';
        }
        this.router.navigate(['/coffee-lab/create-post/tab'], {
            queryParams: { type: selectedType },
        });
    }
}
