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
    originalArticleUrl;
    originalArticleData;

    constructor(private coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {
        this.getOriginalDetails();
    }

    getOriginalDetails(): void {
        this.coffeeLabService
            .getForumDetails('article', this.detailsData?.original_article_id)
            .subscribe((res: any) => {
                if (res.success) {
                    this.originalArticleData = res.result;
                    this.originalArticleUrl = `${environment.endUserWeb}/coffee-lab/articles/${res.result.slug}`;
                }
            });
    }
}
