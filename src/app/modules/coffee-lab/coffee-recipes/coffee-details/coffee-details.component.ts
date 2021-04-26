import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoffeeLabService } from '@services';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
    selector: 'app-coffee-details',
    templateUrl: './coffee-details.component.html',
    styleUrls: ['./coffee-details.component.scss'],
})
export class CoffeeDetailsComponent implements OnInit {
    relatedData: any[] = [];
    detailsData: any;
    id: string | number = '';
    isLoading = true;
    commentData: any[] = [];
    items: MenuItem[] = [
        {
            items: [
                {
                    label: 'Share',
                    command: () => {
                        this.onShare({});
                    },
                },
                {
                    label: 'Save Post',
                    command: () => {
                        this.onSavePost({});
                    },
                },
                {
                    label: 'Translate answer',
                    command: () => {
                        this.onTranslate({});
                    },
                },
            ],
        },
    ];
    constructor(
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private coffeeLabService: CoffeeLabService,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.id = params.id;
            this.getCoffeeDetails(true);
            this.getCoffeeRecipesData();
        });
    }

    getCoffeeDetails(isReloading: boolean): void {
        this.isLoading = isReloading;
        this.coffeeLabService.getForumDetails('recipe', this.id).subscribe((res: any) => {
            if (res.success) {
                console.log('coffe details--------', res);
                this.detailsData = res.result;
                this.getCommentsData();
            }
            this.isLoading = false;
        });
    }

    getCoffeeRecipesData() {
        this.coffeeLabService.getForumList('recipe').subscribe((res) => {
            if (res.success) {
                console.log('response----->>>>>', res);
                this.relatedData = res.result.filter((item: any) => item.id !== this.id).slice(0, 5);
            }
        });
    }

    postComment(event: any) {
        console.log('event--', event);
        this.coffeeLabService.postComment('recipe', this.id, event).subscribe((res: any) => {
            if (res.success) {
                this.getCoffeeDetails(false);
            }
        });
    }

    getCommentsData(): void {
        this.coffeeLabService.getCommentList('recipe', this.detailsData.slug).subscribe((res: any) => {
            if (res.success) {
                this.commentData = res.result;
            }
        });
    }

    ngOnInit(): void {}

    onShare(postItem: any): void {}
    onSavePost(postItem: any): void {}
    onTranslate(postItem: any): void {
        this.router.navigate(['/coffee-lab/create-post/translate-recipe'], {
            queryParams: { id: this.id },
        });
    }
}
