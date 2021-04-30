import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@shared';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-draft-posts',
    templateUrl: './draft-posts.component.html',
    styleUrls: ['./draft-posts.component.scss'],
})
export class DraftPostsComponent implements OnInit {
    drafts: any[] = [];

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private dialogService: DialogService,
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
    ) {}

    ngOnInit(): void {
        this.drafts = this.config.data;
    }

    onDeleteDraft(draft: any): void {
        console.log('deleting draft >>>>>>>>>', draft);
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
            if (action === 'yes') {
                this.coffeeLabService
                    .deleteForumById(draft.post_type, draft.post_id)
                    .subscribe((res: any) => {
                        if (res.success) {
                            this.drafts = this.drafts.filter((item: any) => item.post_id !== draft.post_id);
                            this.toastService.success(`You have deleted a forum successfully.`);
                            this.coffeeLabService.forumDeleteEvent.emit();
                        } else {
                            this.toastService.error(`Failed to delete a forum.`);
                        }
                    });
            }
        });
    }
}
