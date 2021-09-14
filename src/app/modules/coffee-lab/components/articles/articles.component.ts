import { Component, Input, OnInit } from '@angular/core';
import { AuthService, CoffeeLabService } from '@services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
    @Input() articles: any;
    @Input() isMyPost = false;
    @Input() isSavedPost = false;
    totalRecords = 0;
    displayData: any[] = [];
    pageDesc: string | undefined;
    isSaveBtn = false;

    constructor(
        public coffeeLabService: CoffeeLabService,
        public authService: AuthService,
        private router: Router,
        private toastService: ToastrService,
    ) {
        this.pageDesc = this.router.url.split('/')[this.router.url.split('/').length - 2];
    }

    ngOnInit(): void {
        this.displayData = this.articles.slice(0, 9);
        this.totalRecords = this.articles.length;
    }

    paginate(event: any) {
        this.displayData = this.articles.slice(event.first, event.first + event.rows);
    }

    openArticle(slug: string) {
        if (!this.isSaveBtn) {
            if (this.isMyPost) {
                this.router.navigate(['/coffee-lab/articles/' + slug], {
                    queryParams: {
                        isMyPost: true,
                    },
                });
            } else if (this.isSavedPost) {
                this.router.navigate(['/coffee-lab/articles/' + slug], {
                    queryParams: {
                        isSavedPost: true,
                    },
                });
            } else {
                this.router.navigateByUrl('/coffee-lab/articles/' + slug);
            }
        }
    }

    onSave(articleId: number, index: number): void {
        this.isSaveBtn = true;
        setTimeout(() => {
            this.coffeeLabService.saveForum('article', articleId).subscribe((res: any) => {
                if (res.success) {
                    this.articles[index].is_saved = true;
                    this.toastService.success('Successfully saved');
                    this.isSaveBtn = false;
                } else {
                    this.toastService.error('Error while save post');
                }
            });
        }, 100);
    }

    onSameSave(articleId: number, index: number) {
        this.isSaveBtn = true;
        setTimeout(() => {
            this.coffeeLabService.unSaveFormByType('article', articleId).subscribe((res: any) => {
                if (res.success) {
                    this.toastService.success(`You have removed the article successfully from saved posts.`);
                    this.articles[index].is_saved = false;
                    this.isSaveBtn = false;
                } else {
                    this.toastService.error(`Failed to remmove a article from saved posts.`);
                }
            });
        }, 100);
        if (!this.isSaveBtn) {
        }
    }
}
