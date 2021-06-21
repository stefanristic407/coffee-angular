import { Component, Input, OnInit } from '@angular/core';
import { AuthService, CoffeeLabService } from '@services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
    @Input() recipes: any[] = [];
    organizationId: any;
    totalRecords = 0;
    displayData: any[] = [];
    pageDesc: string | undefined;

    constructor(public coffeeLabService: CoffeeLabService, public authService: AuthService, private router: Router) {
        this.pageDesc = this.router.url.split('/')[this.router.url.split('/').length - 2];
    }

    ngOnInit(): void {
        this.organizationId = this.authService.getOrgId();
        this.displayData = this.recipes.slice(0, 9);
        this.totalRecords = this.recipes.length;
    }

    paginate(event: any) {
        this.displayData = this.recipes.slice(event.first, event.first + event.rows);
    }
}
