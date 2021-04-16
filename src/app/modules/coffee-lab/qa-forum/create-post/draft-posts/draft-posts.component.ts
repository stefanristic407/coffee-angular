import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-draft-posts',
    templateUrl: './draft-posts.component.html',
    styleUrls: ['./draft-posts.component.scss'],
})
export class DraftPostsComponent implements OnInit {
    isLoading = false;
    drafts: any[] = [];

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private coffeeLabService: CoffeeLabService,
        private toastrService: ToastrService,
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.coffeeLabService.getDrafts().subscribe((res: any) => {
            this.isLoading = false;
            if (res.success) {
                this.drafts = res.result.filter((draft: any) => draft.post_type === 'question');
            } else {
                this.toastrService.error('Failed to get drafts');
            }
            console.log('drafts >>>>>>>>>>>', res);
        });
    }
}
