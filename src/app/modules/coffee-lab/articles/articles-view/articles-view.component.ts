import { Component, OnInit } from '@angular/core';
import { CoffeeLabService, GlobalsService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
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
    items: MenuItem[] = [
        {
            items: [
                {
                    label: this.globalsService.languageJson.share,
                    command: () => {
                        this.onShare({});
                    },
                },
                {
                    label: this.globalsService.languageJson.save_post,
                    command: () => {
                        this.onSavePost({});
                    },
                },
            ],
        },
    ];
    isLoading = false;
    constructor(
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private globalsService: GlobalsService,
    ) {}

    ngOnInit(): void {
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
        this.coffeeLabService.getForumList('article', params).subscribe((res) => {
            if (res.success) {
                this.articlesData = res.result;
            } else {
                this.toastService.error('Cannot get Articles data');
            }
            this.isLoading = false;
        });
    }

    onShare(postItem: any): void {}
    onSavePost(postItem: any): void {}
}
