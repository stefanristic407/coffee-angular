import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-assigned-to-me-view',
    templateUrl: './assigned-to-me-view.component.html',
    styleUrls: ['./assigned-to-me-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AssignedToMeViewComponent extends DestroyableComponent implements OnInit {
    viewMode = 'list';
    sortOptions = [
        { label: 'latest', value: 'latest' },
        { label: 'most_answered', value: 'most_answered' },
        { label: 'oldest', value: 'oldest' },
    ];
    questions: any[] = [];
    isLoading = false;
    pages = 1;
    totalRecords: number;
    rows = 10;

    constructor(public coffeeLabService: CoffeeLabService, private toastService: ToastrService) {
        super();
    }

    ngOnInit(): void {
        window.scroll(0, 0);
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((language) => {
            this.getQuestions();
        });
    }

    getQuestions(): void {
        const params = {
            org_type: 'ro',
            sort_by: this.coffeeLabService.assignedToMeSortBy === 'most_answered' ? 'most_answered' : 'posted_at',
            sort_order:
                this.coffeeLabService.assignedToMeSortBy === 'most_answered' ||
                this.coffeeLabService.assignedToMeSortBy === 'latest'
                    ? 'desc'
                    : 'asc',
            page: this.pages,
            per_page: this.rows,
        };
        this.isLoading = true;
        this.coffeeLabService.getForumList('question', params).subscribe((res: any) => {
            this.isLoading = false;
            if (res.success) {
                this.questions = res.result?.questions || [];
                this.totalRecords = res.result_info.total_count;
            } else {
                this.toastService.error('Cannot get forum data');
            }
        });
    }

    paginate(event: any) {
        if (this.pages !== event.page + 1) {
            this.pages = event.page + 1;
            this.getQuestions();
        }
    }
}
