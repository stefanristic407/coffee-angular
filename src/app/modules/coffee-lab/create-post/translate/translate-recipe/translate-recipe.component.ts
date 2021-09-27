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
    selectedTab = 0;
    tranalatedLangs = [];
    id: any;
    draftId: string;
    isMobile = false;
    allLanguage: any[] = APP_LANGUAGES;
    remainingLangugage = [];

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        private coffeeLabService: CoffeeLabService,
        private dialogService: DialogService,
        private toastService: ToastrService,
        private globalsService: GlobalsService,
    ) {
        this.id = this.route.snapshot.queryParamMap.get('origin_id');
        this.draftId = this.route.snapshot.queryParamMap.get('draft_id');
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
        this.selectedTab = event.index;
    }

    checkTranslationExits(emitedObject) {
        this.allLanguage.forEach((item) => {
            const isTranslate = emitedObject?.translation?.find((trans) => item.value === trans.language);
            if (!isTranslate && emitedObject.lang_code !== item.value) {
                this.remainingLangugage.push(item);
            }
        });
    }

    onDeleteDraft(): void {
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                    desp:
                        this.globalsService.languageJson?.are_you_sure_delete +
                        ' recipe?' +
                        this.globalsService.languageJson?.delete_from_coffee_lab,
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
}
