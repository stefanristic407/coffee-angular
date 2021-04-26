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
    @Input() forumType: string;
    originalUrl: any;
    originalData: any;
    originalForumData: any;

    constructor(private coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {
        this.originalForumData = this.detailsData[`original_${this.forumType}`];
        this.getOriginalDetails();
    }

    getOriginalDetails(): void {
        this.coffeeLabService
            .getForumDetails(this.forumType, this.detailsData?.original_article_id)
            .subscribe((res: any) => {
                if (res.success) {
                    this.originalData = res.result;
                    this.originalUrl = `${environment.roasterWeb}/coffee-lab/${this.forumType}s/${res.result.slug}`;
                }
            });
    }
}
