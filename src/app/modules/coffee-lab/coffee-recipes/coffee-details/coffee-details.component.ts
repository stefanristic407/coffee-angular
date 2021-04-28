import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoffeeLabService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-coffee-details',
    templateUrl: './coffee-details.component.html',
    styleUrls: ['./coffee-details.component.scss'],
    providers: [MessageService],
})
export class CoffeeDetailsComponent implements OnInit {
    relatedData: any[] = [];
    organizationId: any;
    detailsData: any;
    id: string | number = '';
    isLoading = true;
    commentData: any[] = [];
    constructor(
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private coffeeLabService: CoffeeLabService,
        private cookieService: CookieService,
        private messageService: MessageService,
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
                this.detailsData.description = this.getJustText(this.detailsData.description);
                this.getCommentsData();
                if (this.detailsData?.steps && this.detailsData?.steps.length > 0) {
                    this.detailsData.steps.map((item) => {
                        item.description = this.getJustText(item.description);
                        return item;
                    });
                }
                if (res.result.parent_id) {
                    this.messageService.clear();
                    this.messageService.add({
                        key: 'translate',
                        severity: 'success',
                        closable: false,
                    });
                }
            }
            this.isLoading = false;
        });
    }

    getCoffeeRecipesData() {
        this.coffeeLabService.getForumList('recipe').subscribe((res) => {
            if (res.success) {
                console.log('response----->>>>>', res);
                this.relatedData = res.result.filter((item: any) => item.id !== this.id).slice(0, 5);
                this.relatedData.map((item) => {
                    item.description = this.getJustText(item.description);
                    return item;
                });
            }
        });
    }

    postComment(event: any) {
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

    ngOnInit(): void {
        this.organizationId = +this.cookieService.get('roaster_id');
    }

    getJustText(content: any) {
        const contentElement = document.createElement('div');
        contentElement.innerHTML = content;
        const images = contentElement.querySelectorAll('img');
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < images.length; i++) {
            images[0].parentNode.removeChild(images[0]);
        }
        return contentElement.innerHTML;
    }
}
