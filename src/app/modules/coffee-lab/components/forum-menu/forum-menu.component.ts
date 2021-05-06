import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CoffeeLabService, GlobalsService } from '@services';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@shared';

@Component({
    selector: 'app-forum-menu',
    templateUrl: './forum-menu.component.html',
    styleUrls: ['./forum-menu.component.scss'],
})
export class ForumMenuComponent implements OnInit {
    @Input() selectedItem: any;
    @Input() extraInfo: any;
    @Input() forumType: any = 'question'; // question, article, recipe, answer, articleComment, recipeComment
    @Input() enableEdit = false;
    @Input() enableDelete = false;
    @Input() enableShare = true;
    @Input() enableSave = true;
    @Input() enableDeleteSave = false;
    @Input() enableTranslation = false;
    items: MenuItem[] = [];

    constructor(
        public globalsService: GlobalsService,
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private router: Router,
        private dialogService: DialogService,
    ) {}

    ngOnInit(): void {
        if (this.enableEdit) {
            this.items.push({
                label: this.globalsService.languageJson.edit,
                command: () => {
                    this.onEdit();
                },
            });
        }
        if (this.enableDelete) {
            this.items.push({
                label: this.globalsService.languageJson.delete,
                command: () => {
                    this.onDelete();
                },
            });
        }
        if (this.enableShare) {
            this.items.push({
                label: this.globalsService.languageJson.share,
                command: () => {
                    this.onShare();
                },
            });
        }
        if (this.enableSave) {
            this.items.push({
                label: this.globalsService.languageJson.save_post,
                command: () => {
                    this.onSave();
                },
            });
        }
        if (this.enableTranslation) {
            this.items.push({
                label: this.globalsService.languageJson.translate_post,
                command: () => {
                    this.onTranslate();
                },
            });
        }
        if (this.enableDeleteSave) {
            this.items.push({
                label: this.globalsService.languageJson.remove.concat(' ', this.globalsService.languageJson.save_post),
                command: () => {
                    this.onDelete();
                },
            });
        }
    }

    onShare(): void {
        let url = '';
        switch (this.forumType) {
            case 'question':
                url = `${environment.roasterWeb}/coffee-lab/questions/${this.selectedItem.slug}`;
                break;
            case 'article':
                url = `${environment.roasterWeb}/coffee-lab/articles/${this.selectedItem.slug}`;
                break;
            case 'recipe':
                url = `${environment.roasterWeb}/coffee-lab/recipes/${this.selectedItem.slug}`;
                break;
            case 'answer':
                url = `${environment.roasterWeb}/coffee-lab/questions/${this.extraInfo}?answer=${this.selectedItem.id}`;
                break;
            case 'comment':
                break;
        }
        this.coffeeLabService.copyContext(url);
    }

    onSave(): void {
        console.log('on save >>>>>>>>>>', this.selectedItem);
        this.coffeeLabService.saveForum(this.forumType, this.selectedItem.id).subscribe((res: any) => {
            console.log('save forum result >>>>>>>>', res);
            if (res.success) {
                this.toastService.success('Successfully saved');
            } else {
                if (res?.messages.length && res?.messages?.[`${this.forumType}_id`][0] === 'already_exists') {
                    this.toastService.error('You already saved this post');
                } else {
                    this.toastService.error('Error while save post');
                }
            }
        });
    }

    onTranslate(): void {
        switch (this.forumType) {
            case 'question':
                break;
            case 'article':
                this.router.navigate(['/coffee-lab/create-post/translate-article'], {
                    queryParams: { id: this.selectedItem.id },
                });
                break;
            case 'recipe':
                this.router.navigate(['/coffee-lab/create-post/translate-recipe'], {
                    queryParams: { id: this.selectedItem.id, type: this.forumType },
                });
                break;
            case 'answer':
                console.log('lets go here');
                this.router.navigate(['/coffee-lab/create-post/translate-answer'], {
                    queryParams: { id: this.selectedItem.id },
                });
                break;
            case 'comment':
                break;
        }
    }

    onEdit(): void {
        switch (this.forumType) {
            case 'question':
                this.router.navigate(['/coffee-lab/create-post/tab'], {
                    queryParams: { id: this.selectedItem.id, type: this.forumType },
                });
                break;
            case 'article':
                this.router.navigate(['/coffee-lab/create-post/tab'], {
                    queryParams: { id: this.selectedItem.id, type: this.forumType },
                });
                break;
            case 'recipe':
                this.router.navigate(['/coffee-lab/create-post/tab'], {
                    queryParams: { id: this.selectedItem.id, type: this.forumType },
                });
                break;
            case 'answer':
                this.router.navigate(['/coffee-lab/create-post/answer'], {
                    queryParams: {
                        forumId: this.selectedItem.answer_id || this.selectedItem.id,
                        parentForumType: 'question',
                        forumType: 'answer',
                    },
                });
                break;
            case 'comment':
                this.router.navigate(['/coffee-lab/create-post/comment'], {
                    queryParams: {
                        forumType: 'comment',
                        forumId: this.selectedItem.id,
                    },
                });
                break;
        }
    }

    onDelete(): void {
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
                        .deleteForumById(this.forumType, this.selectedItem.id)
                        .subscribe((res: any) => {
                            console.log('delete forum result >>>>>>>>>>>', res);
                            if (res.success) {
                                this.toastService.success(`You have deleted a ${this.forumType} successfully.`);
                                this.coffeeLabService.forumDeleteEvent.emit();
                            } else {
                                this.toastService.error(`Failed to delete a ${this.forumType}.`);
                            }
                        });
                }
            });
    }
}
