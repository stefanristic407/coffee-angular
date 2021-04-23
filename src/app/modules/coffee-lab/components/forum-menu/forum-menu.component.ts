import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CoffeeLabService, GlobalsService } from '@services';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    @Input() enableTranslation = false;

    items: MenuItem[] = [];

    constructor(
        public globalsService: GlobalsService,
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private router: Router,
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
    }

    onShare(): void {
        let url = '';
        switch (this.forumType) {
            case 'question':
                url = `${environment.roasterWeb}/coffee-lab/questions/${this.selectedItem.slug}`;
                break;
            case 'article':
                break;
            case 'recipe':
                break;
            case 'answer':
                url = `${environment.roasterWeb}/coffee-lab/questions/${this.extraInfo}?answer=${this.selectedItem.id}`;
                break;
            case 'articleComment':
                break;
            case 'recipeComment':
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
                if (res?.messages?.[`${this.forumType}_id`][0] === 'already_exists') {
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
                break;
            case 'answer':
                console.log('lets go here');
                this.router.navigate(['/coffee-lab/create-post/translate-answer'], {
                    queryParams: { id: this.selectedItem.id },
                });
                break;
            case 'articleComment':
                break;
            case 'recipeComment':
                break;
        }
    }

    onEdit(): void {}
    onDelete(): void {}
}
