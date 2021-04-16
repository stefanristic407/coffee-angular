import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoffeeLabService, GlobalsService } from '@services';
import {DOCUMENT, Location} from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.scss'],
})
export class QuestionDetailComponent implements OnInit {
    slug?: string;
    isLoading = false;
    detailsData: any;
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

    constructor(
        private coffeeLabService: CoffeeLabService,
        private activatedRoute: ActivatedRoute,
        @Inject(DOCUMENT) private document: any,
        public globalsService: GlobalsService,
        public location: Location
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.slug = params.slug;
            this.getDetails();
        });
    }

    ngOnInit(): void {
        window.scroll(0, 0);
    }

    getDetails(): void {
        this.isLoading = true;
        this.coffeeLabService.getForumDetails('question', this.slug).subscribe((res: any) => {
            this.isLoading = false;
            if (res.success) {
                this.detailsData = res.result;
                console.log('question details data >>>>>>>>', this.detailsData);
                setTimeout(() => {
                    this.setPagePosition();
                }, 100);
            }
        });
    }

    setPagePosition(): void {
        const answerId = this.activatedRoute.snapshot.queryParamMap.get('answer');
        if (answerId) {
            const element = this.document.getElementById(answerId);
            const screenWidth = window.innerWidth;
            let offsetTop = 0;
            if (screenWidth > 991) {
                offsetTop = element.offsetTop - 136;
            } else if (screenWidth > 767) {
                offsetTop = element.offsetTop - 70;
            } else {
                offsetTop = element.offsetTop - 56;
            }
            window.scroll(0, offsetTop);
        }
    }

    onShare(postItem: any): void {}
    onSavePost(postItem: any): void {}
}
