import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DestroyableComponent } from '@base-components';
import { environment } from '@env/environment';
import { CoffeeLabGlobalSearchResult } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { CoffeeLabService } from '@services';
import { MenuItem } from 'primeng/api';
import { forkJoin, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
    readonly coffeeLabURL = environment.coffeeLabWeb;
    menuItems = [];
    currentTabIndex: number;

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        if (this.route.firstChild.snapshot.routeConfig.path === 'qa-forum') {
            this.changeH1Title(0);
        } else if (this.route.firstChild.snapshot.routeConfig.path === 'articles') {
            this.changeH1Title(1);
        } else if (this.route.firstChild.snapshot.routeConfig.path === 'coffee-recipes') {
            this.changeH1Title(2);
        } else {
            this.changeH1Title(3);
        }
        this.menuItems = [
            {
                label: 'question_answers',
                routerLink: 'qa-forum',
                command: () => this.changeH1Title(0),
            },
            {
                label: 'posts',
                routerLink: 'articles',
                command: () => this.changeH1Title(1),
            },
            {
                label: 'brewing_guides',
                routerLink: 'coffee-recipes',
                command: () => this.changeH1Title(2),
            },
            {
                label: 'my_posts',
                routerLink: 'my-posts',
                command: () => this.changeH1Title(3),
            },
            {
                label: 'saved_posts',
                routerLink: 'saved-posts',
                command: () => this.changeH1Title(4),
            },
            {
                label: 'assigned_to_me',
                routerLink: 'assigned-to-me',
                command: () => this.changeH1Title(5),
            },
        ];
    }

    onSearch() {
        this.router.navigate([`/coffee-lab/search`], {
            queryParams: { query: '' },
        });
    }

    onStart() {
        let selectedtype: string;
        if (this.currentTabIndex === 0) {
            selectedtype = 'question';
        }
        if (this.currentTabIndex === 1) {
            selectedtype = 'article';
        }
        if (this.currentTabIndex === 2) {
            selectedtype = 'recipe';
        }
        this.router.navigate(['/coffee-lab/create-post/tab'], {
            queryParams: { type: selectedtype },
        });
    }

    changeH1Title(index: number) {
        this.currentTabIndex = index;
    }
}
