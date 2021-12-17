import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from '@app/shared';
import { APP_LANGUAGES } from '@constants';
import { CoffeeLabService, GlobalsService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-translate-recipe',
    templateUrl: './translate-recipe.component.html',
    styleUrls: ['./translate-recipe.component.scss'],
})
export class TranslateRecipeComponent implements OnInit {
    tranalatedLangs = [];
    id: any;
    draftId: string;
    isMobile = false;
    showNoDataSection = false;
    allLanguage: any[] = APP_LANGUAGES;
    recipeSlug: string;
    remainingLangugage = [];
    selectedLang: string;

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        private coffeeLabService: CoffeeLabService,
        private dialogService: DialogService,
        private toastService: ToastrService,
        private globalsService: GlobalsService,
    ) {
        this.route.queryParams.subscribe((params) => {
            this.id = params.origin_id;
            this.draftId = params.draft_id;
        });

        this.isMobile = window.innerWidth < 767;
    }

    ngOnInit(): void {}

    onSave(status: boolean): void {
        if (status) {
            this.coffeeLabService.originalPost.next(true);
        } else {
            this.coffeeLabService.draftPost.next(true);
        }
    }

    onChangeTab(event) {
        this.checkDraft();
    }

    checkTranslationExits(emitedObject) {
        this.recipeSlug = emitedObject?.slug;
        this.allLanguage.forEach((item) => {
            const isTranslate = emitedObject?.translation?.find((trans) => item.value === trans.language);
            if (!isTranslate && emitedObject.lang_code !== item.value) {
                this.remainingLangugage.push(item);
            }
        });
        this.selectedLang = this.remainingLangugage[0].value;
        this.checkDraft();
        if (this.remainingLangugage.length === 0) {
            this.showNoDataSection = true;
            this.toastService.error(this.globalsService.languageJson?.no_language_available_translated);
        }
    }

    checkDraft() {
        const draft = this.coffeeLabService.allDrafts.value?.find((item) => {
            return (
                item.parent_id === +this.id &&
                item.post_type === 'recipe' &&
                item.language === this.remainingLangugage.find((lang) => lang.value === this.selectedLang).value
            );
        });
        if (draft) {
            this.router.navigate(['/coffee-lab/create-post/translate-recipe'], {
                queryParams: {
                    origin_id: this.id,
                    draft_id: draft.post_id,
                    type: 'recipe',
                },
            });
        } else {
            this.router.navigate(['/coffee-lab/create-post/translate-recipe'], {
                queryParams: {
                    origin_id: this.id,
                    lang: this.selectedLang,
                    type: 'recipe',
                },
            });
        }
    }

    onDeleteDraft(): void {
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                    desp: this.globalsService.languageJson?.delete_from_coffee_lab,
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.coffeeLabService.deleteForumById('recipe', this.draftId).subscribe((res: any) => {
                        if (res.success) {
                            this.toastService.success(`Draft recipe deleted successfully`);
                            this.coffeeLabService.forumDeleteEvent.emit();
                            this.router.navigateByUrl('/coffee-lab/overview/coffee-recipes');
                        } else {
                            this.toastService.error(`Failed to delete a forum.`);
                        }
                    });
                }
            });
    }

    onCancel() {
        if (this.draftId) {
            this.router.navigate(['/coffee-lab/create-post/tab'], {
                queryParams: {
                    type: 'draft',
                },
            });
        } else {
            this.router.navigateByUrl('/coffee-lab/recipes/' + this.recipeSlug);
        }
    }
}
