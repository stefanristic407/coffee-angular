import { Component, Input, OnInit } from '@angular/core';
import { AuthService, CoffeeLabService } from '@services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-article-card',
    templateUrl: './article-card.component.html',
    styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
    @Input() article: any;
    @Input() isMyPost = false;
    @Input() isSavedPost = false;
    isSaveBtn = false;

    constructor(
        public coffeeLabService: CoffeeLabService,
        public authService: AuthService,
        private router: Router,
        private toastService: ToastrService,
    ) {}

    ngOnInit(): void {}

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

    onSave(articleId: number): void {
        this.isSaveBtn = true;
        setTimeout(() => {
            this.coffeeLabService.saveForum('article', articleId).subscribe((res: any) => {
                if (res.success) {
                    this.article.is_saved = true;
                    this.toastService.success('Successfully saved');
                    this.isSaveBtn = false;
                } else {
                    this.toastService.error('Error while save post');
                }
            });
        }, 100);
    }

    onSameSave(articleId: number) {
        this.isSaveBtn = true;
        setTimeout(() => {
            this.coffeeLabService.unSaveFormByType('article', articleId).subscribe((res: any) => {
                if (res.success) {
                    this.toastService.success(`You have removed the article successfully from saved posts.`);
                    this.article.is_saved = false;
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
