import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostType } from '@enums';
import { AuthService, CoffeeLabService } from '@services';
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
    isLikedBtn = false;

    constructor(
        public coffeeLabService: CoffeeLabService,
        public authService: AuthService,
        private router: Router,
        private toastService: ToastrService,
    ) {}

    ngOnInit(): void {}

    openArticle(slug: string) {
        if (!this.isSaveBtn && !this.isLikedBtn) {
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
            if (this.article.is_saved) {
                this.coffeeLabService.unSaveFormByType(PostType.ARTICLE, articleId).subscribe((res: any) => {
                    if (res.success) {
                        this.toastService.success(`You have removed the article successfully from saved posts.`);
                        this.article.is_saved = false;
                        this.isSaveBtn = false;
                    } else {
                        this.toastService.error(`Failed to remmove a article from saved posts.`);
                    }
                });
            } else {
                this.coffeeLabService.saveForum(PostType.ARTICLE, articleId).subscribe((res: any) => {
                    if (res.success) {
                        this.article.is_saved = true;
                        this.toastService.success('Successfully saved');
                        this.isSaveBtn = false;
                    } else {
                        this.toastService.error('Error while save post');
                    }
                });
            }
        }, 100);
    }

    onLike(articleId: number) {
        this.isLikedBtn = true;
        if (this.article.is_liked) {
            this.coffeeLabService.updateUnLike(PostType.ARTICLE, articleId).subscribe((res) => {
                if (res.success) {
                    this.article.is_liked = false;
                    this.article.likes = this.article.likes - 1;
                    this.isLikedBtn = false;
                }
            });
        } else {
            this.coffeeLabService.updateLike(PostType.ARTICLE, articleId).subscribe((res) => {
                if (res.success) {
                    this.article.is_liked = true;
                    this.article.likes = this.article.likes + 1;
                    this.isLikedBtn = false;
                }
            });
        }
    }
}
