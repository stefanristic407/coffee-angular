import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CoffeeLabService, AuthService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-articles-view',
    templateUrl: './articles-view.component.html',
    styleUrls: ['./articles-view.component.scss'],
})
export class ArticlesViewComponent implements OnInit, OnDestroy {
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
    forumLanguageSub: Subscription;
    forumDeleteSub: Subscription;
    forumLanguage: string;
    constructor(
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private router: Router,
        private coffeeLab: CoffeeLabService,
        private cookieService: CookieService,
        public authService: AuthService,
    ) {
        this.pageDesc = this.router.url.split('/')[this.router.url.split('/').length - 2];
    }

    ngOnInit(): void {
        this.organizationId = +this.cookieService.get('roaster_id');
        this.forumLanguageSub = this.coffeeLabService.forumLanguage.subscribe((language) => {
            this.forumLanguage = language;
            this.getData();
        });
        this.forumDeleteSub = this.coffeeLabService.forumDeleteEvent.subscribe(() => {
            this.getData();
        });
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
                    this.articlesData.map((item) => {
                        item.content = this.getJustText(item.content);
                        return item;
                    });
                } else {
                    this.toastService.error('Cannot get Articles data');
                }
                this.isLoading = false;
            });
        } else if (this.pageDesc === 'my-posts') {
            this.coffeeLab.getMyForumList('article').subscribe((res) => {
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
        } else {
            this.coffeeLabService.getForumList('article', params, this.forumLanguage).subscribe((res) => {
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
        images.forEach((image) => {
            image.parentNode.removeChild(image);
        });
        return contentElement.innerHTML;
    }

    ngOnDestroy(): void {
        this.forumLanguageSub.unsubscribe();
    }
}
