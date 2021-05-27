import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-assigned-to-me-view',
    templateUrl: './assigned-to-me-view.component.html',
    styleUrls: ['./assigned-to-me-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AssignedToMeViewComponent implements OnInit {
    viewMode = 'list';
    sortOptions = [
        { label: 'Latest', value: 'latest' },
        { label: 'Most Answered', value: 'most_answered' },
        { label: 'Oldest', value: 'oldest' },
    ];
    sortBy = 'latest';
    filterBy = null;
    questions: any[] = [];
    isLoading = false;
    keyword = '';

    constructor(private coffeeLabService: CoffeeLabService, private toastService: ToastrService) {}

    ngOnInit(): void {
        window.scroll(0, 0);
        this.getQuestions();
    }

    getQuestions(): void {
        const params = {
            query: this.keyword,
            posted_user_id: this.filterBy,
            org_type: 'ro',
            sort_by: this.sortBy === 'most_answered' ? 'posted_at' : 'posted_at',
            sort_order: this.sortBy === 'most_answered' ? 'desc' : this.sortBy === 'latest' ? 'desc' : 'asc',
        };
        this.isLoading = true;
        this.coffeeLabService.getForumList('question', params).subscribe((res: any) => {
            this.isLoading = false;
            if (res.success) {
                console.log('questions >>>>>>>', res);
                this.questions = res.result?.questions;
            } else {
                this.toastService.error('Cannot get forum data');
            }
        });
    }
}
