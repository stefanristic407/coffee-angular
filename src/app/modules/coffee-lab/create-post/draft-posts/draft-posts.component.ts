import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@shared';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';

interface Draft {
    created_at: string;
    parent_id: number;
    post_id: number;
    post_title: string;
    post_type: string;
    slug: string;
    updated_at: string;
}

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
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.drafts = this.config.data;
        console.log('drafts >>>>>>>>>>>>', this.drafts);
    }

    onDeleteDraft(draft: Draft): void {
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                    desp: 'Are you sure you want to remove this post?',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.coffeeLabService.deleteForumById(draft.post_type, draft.post_id).subscribe((res: any) => {
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

    onClickDraft(draft: Draft): void {
        if (draft.parent_id) {
            this.router.navigate(['/coffee-lab/create-post/translate-' + draft.post_type], {
                queryParams: {
                    origin_id: draft.parent_id,
                    draft_id: draft.post_id,
                    type: draft.post_type,
                },
            });
        } else {
            this.router.navigate(['/coffee-lab/create-post/tab'], {
                queryParams: {
                    id: draft.post_id,
                    type: draft.post_type,
                },
            });
        }
        this.ref.close();
    }
}
