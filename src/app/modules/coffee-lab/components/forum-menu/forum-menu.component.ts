import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DestroyableComponent } from '@base-components';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { CoffeeLabService } from '@services';
import { ConfirmComponent } from '@shared';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Menu } from 'primeng/menu';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-forum-menu',
    templateUrl: './forum-menu.component.html',
    styleUrls: ['./forum-menu.component.scss'],
})
export class ForumMenuComponent extends DestroyableComponent implements OnInit {
    @Input() selectedItem: any;
    @Input() extraInfo: any;
    @Input() forumType: any = 'question'; // question, article, recipe, answer, articleComment, recipeComment
    @Input() enableEdit = false;
    @Input() enableDelete = false;
    @Input() enableShare = true;
    @Input() enableSave = true;
    @Input() enableDeleteSave = false;
    @Input() enableTranslation = false;
    @Output() editAnswer = new EventEmitter();
    items: MenuItem[] = [];
    @ViewChild('menu', { static: false }) menu: Menu;

    constructor(
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private router: Router,
        private dialogService: DialogService,
        private translator: TranslateService,
    ) {
        super();
    }

    ngOnInit(): void {
        console.log(this.selectedItem);
        this.coffeeLabService.forumLanguage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((lang) => {
            this.items = [];
            if (this.enableEdit) {
                this.items.push({
                    label: this.translator.instant('edit'),
                    command: () => {
                        this.onEdit();
                    },
                });
            }
            if (this.enableDelete) {
                this.items.push({
                    label: this.translator.instant('delete'),
                    command: () => {
                        this.onDelete();
                    },
                });
            }
            if (this.enableShare) {
                this.items.push({
                    label: this.translator.instant('share'),
                    command: () => {
                        this.onShare();
                    },
                });
            }
            if (this.enableSave) {
                this.items.push({
                    label: this.translator.instant('save_post'),
                    command: () => {
                        this.onSave();
                    },
                });
            }
            if (this.enableTranslation) {
                this.items.push({
                    label: this.translator.instant('translate_post'),
                    command: () => {
                        this.onTranslate();
                    },
                });
            }
            if (this.enableDeleteSave) {
                this.items.push({
                    label: this.translator.instant('remove').concat(' ', this.translator.instant('save_post')),
                    command: () => {
                        this.onRemoveSavedPosts();
                    },
                });
            }
        });
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
                url = `${environment.roasterWeb}/coffee-lab/questions/${this.selectedItem.slug}`;
                break;
            case 'comment':
                break;
        }
        this.coffeeLabService.copyContext(url);
    }

    onSave(): void {
        this.coffeeLabService.saveForum(this.forumType, this.selectedItem.id).subscribe((res: any) => {
            if (res.success) {
                this.toastService.success('Successfully saved');
            } else {
                if (res?.messages.length && res?.messages?.[`${this.forumType}_id`][0] === 'already_exists') {
                    this.toastService.error('You already saved this ' + this.forumType);
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
                    queryParams: { origin_id: this.selectedItem.id, type: this.forumType },
                });
                break;
            case 'recipe':
                this.router.navigate(['/coffee-lab/create-post/translate-recipe'], {
                    queryParams: { origin_id: this.selectedItem.id, type: this.forumType },
                });
                break;
            case 'answer':
                this.router.navigate(['/coffee-lab/create-post/translate-answer'], {
                    queryParams: { origin_id: this.selectedItem.id, type: this.forumType },
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
                this.editAnswer.emit(true);
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
                    desp: this.translator.instant('delete_from_coffee_lab'),
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.coffeeLabService
                        .deleteForumById(this.forumType, this.selectedItem.id)
                        .subscribe((res: any) => {
                            if (res.success) {
                                this.toastService.success(`You have deleted a ${this.forumType} successfully.`);
                                this.coffeeLabService.forumDeleteEvent.emit(this.forumType);
                            } else {
                                this.toastService.error(`Failed to delete a ${this.forumType}.`);
                            }
                        });
                }
            });
    }

    onRemoveSavedPosts(): void {
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                    desp: 'Are you sure you want to remove this ' + this.forumType + '?',
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.coffeeLabService
                        .unSaveFormByType(this.forumType, this.selectedItem.id)
                        .subscribe((res: any) => {
                            if (res.success) {
                                this.toastService.success(
                                    `You have removed the ${this.forumType} successfully from saved posts.`,
                                );
                                this.coffeeLabService.forumDeleteEvent.emit();
                            } else {
                                this.toastService.error(`Failed to remmove a ${this.forumType} from saved posts.`);
                            }
                        });
                }
            });
    }
}
