import { Component, OnInit, Input } from '@angular/core';
import { environment } from '@env/environment';
import { CoffeeLabService } from '@services';

@Component({
    selector: 'app-original-view',
    templateUrl: './original-view.component.html',
    styleUrls: ['./original-view.component.scss'],
})
export class OriginalViewComponent implements OnInit {
    @Input() detailsData: any;
    @Input() parentAnswerId: any;
    @Input() translations: any;
    @Input() forumType: string;
    originalUrl: any;
    originalForumData: any;
    originalForumTitle: string;

    constructor(private coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {
        if (this.forumType === 'question') {
            this.originalForumData = this.translations.find((item: any) => item.id === this.parentAnswerId);
            this.originalUrl = `/coffee-lab/${this.forumType}s/${this.originalForumData.question_slug}`;
            this.originalForumTitle = this.originalForumData.question;
        } else if (this.forumType === 'article') {
            this.originalForumData = this.detailsData[`original_articles`];
            this.getOriginalDetails(this.detailsData?.original_article_id);
        } else {
            this.originalForumData = this.detailsData[`original_details`];
            this.getOriginalDetails(this.detailsData?.original_details.id);
        }
    }

    getOriginalDetails(id): void {
        this.coffeeLabService
            .getForumDetails(this.forumType, id)
            .subscribe((res: any) => {
                if (res.success) {
                    this.originalForumTitle = res.result.title || res.result.name;
                    this.originalUrl = `/coffee-lab/${this.forumType}s/${res.result.slug}`;
                }
            });
    }
}
