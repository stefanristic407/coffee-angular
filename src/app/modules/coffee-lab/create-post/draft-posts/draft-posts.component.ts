import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoffeeLabService, GlobalsService } from '@services';
import { ConfirmComponent } from '@shared';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';

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
    tabList = [
        {
            label: 'Article',
            value: 'article',
        },
        {
            label: 'Recipe',
            value: 'recipe',
        },
        {
            label: 'Question',
            value: 'question',
        },
    ];
    selectedTabType = 'question';

    constructor(
        private dialogService: DialogService,
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private globalsService: GlobalsService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.getDrafts();
    }

    getDrafts(): void {
        const params = {
            post_type: this.selectedTabType,
        };
        this.coffeeLabService.getDrafts(params).subscribe((res: any) => {
            if (res.success) {
                this.drafts = res.result || [];
                this.coffeeLabService.allDrafts.next(this.drafts);
            } else {
                this.toastService.error('Failed to get drafts');
            }
        });
    }

    onDeleteDraft(draft: Draft): void {
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                    desp: this.globalsService.languageJson?.delete_from_coffee_lab,
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.coffeeLabService.deleteForumById(draft.post_type, draft.post_id).subscribe((res: any) => {
                        if (res.success) {
                            this.drafts = this.drafts.filter((item: any) => item.post_id !== draft.post_id);
                            this.toastService.success(`Draft ${draft.post_type} deleted successfully`);
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
                    status: 'draft',
                },
            });
        }
        // this.ref.close();/
    }
}
