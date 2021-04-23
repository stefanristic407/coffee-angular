import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
@Component({
    selector: 'app-articles-view',
    templateUrl: './articles-view.component.html',
    styleUrls: ['./articles-view.component.scss'],
})
export class ArticlesViewComponent implements OnInit {
    keyword?: string;
    translationsList: any[] = [
        {
            label: 'Yes',
            value: true,
        },
        {
            label: 'No',
            value: false,
        },
    ];
    orderList: any[] = [
        {
            label: 'Latest',
            value: 'latest',
        },
        {
            label: 'Oldest',
            value: 'oldest',
        },
    ];
    isAvailableTranslation?: any;
    selectedOrder = 'latest';
    articlesData: any = [];
    isLoading = false;
    pageDesc: string | undefined;
    organizationId: any;
    constructor(
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private activateRoute: ActivatedRoute,
        private coffeeLab: CoffeeLabService,
        private cookieService: CookieService,
    ) {
        this.pageDesc = this.activateRoute.snapshot.routeConfig?.path;
    }

    ngOnInit(): void {
        this.organizationId = +this.cookieService.get('roaster_id');
        this.getData();
    }

    getData(): void {
        this.isLoading = true;
        const params = {
            query: this.keyword,
            translations_available: this.isAvailableTranslation,
            sort_by: 'created_at',
            sort_order: this.selectedOrder === 'latest' ? 'desc' : 'asc',
        };
        if (this.pageDesc === 'saved-posts') {
            this.coffeeLab.getSavedForumList('article').subscribe((res) => {
                if (res.success) {
                    this.articlesData = res.result;
                } else {
                    this.toastService.error('Cannot get Articles data');
                }
                this.isLoading = false;
            });
        } else if (this.pageDesc === 'my-posts') {
            this.coffeeLab.getMyForumList('article').subscribe((res) => {
                if (res.success) {
                    this.articlesData = res.result;
                } else {
                    this.toastService.error('Cannot get Articles data');
                }
                this.isLoading = false;
            });
        } else {
            this.coffeeLabService.getForumList('article', params).subscribe((res) => {
                if (res.success) {
                    this.articlesData = res.result;
                    this.articlesData.map((item) => {
                        item.content = this.getJustText(item.content);
                        return item;
                    });
                } else {
                    this.toastService.error('Cannot get Articles data');
                }
                this.isLoading = false;
            });
        }
    }

    getJustText(content: any) {
        const contentElement = document.createElement('div');
        contentElement.innerHTML = content;
        const images = contentElement.querySelectorAll('img');
        for (let i = 0; i < images.length; i++) {
            images[0].parentNode.removeChild(images[0]);
        }
        return contentElement.innerHTML;
    }
}
