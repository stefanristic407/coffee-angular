import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeLabService } from '@services';
import {} from 'stream';
@Component({
    selector: 'app-translation-dropdown',
    templateUrl: './translation-dropdown.component.html',
    styleUrls: ['./translation-dropdown.component.scss'],
})
export class TranslationDropdownComponent implements OnInit {
    @Input() translatedList: any[] = [];
    @Input() forumType?: string;
    @Output() isToastCalled = new EventEmitter();
    isPostType: any;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private coffeeLabService: CoffeeLabService,
    ) {
        this.activatedRoute.queryParams.subscribe((res) => {
            this.isPostType = res;
        });
    }

    ngOnInit(): void {}

    onChangeTranslate(event: any): void {
        this.coffeeLabService.forumLanguage.next(event.value.language);
        this.isToastCalled.emit(true);
        if (this.isPostType.isMyPost) {
            if (this.forumType === 'question') {
                this.router.navigate([`/coffee-lab/${this.forumType}s/${event.value.question_slug}`], {
                    queryParams: { isMyPost: this.isPostType.isMyPost },
                });
            } else {
                this.router.navigate([`/coffee-lab/${this.forumType}s/${event.value.slug ?? event.value.id}`], {
                    queryParams: { isMyPost: this.isPostType.isMyPost },
                });
            }
        } else if (this.isPostType.isSavedPost) {
            if (this.forumType === 'question') {
                this.router.navigate([`/coffee-lab/${this.forumType}s/${event.value.question_slug}`], {
                    queryParams: { isSavedPost: this.isPostType.isSavedPost },
                });
            } else {
                this.router.navigate([`/coffee-lab/${this.forumType}s/${event.value.slug ?? event.value.id}`], {
                    queryParams: { isSavedPost: this.isPostType.isSavedPost },
                });
            }
        } else if (this.isPostType.isAssignedToMe) {
            if (this.forumType === 'question') {
                this.router.navigate([`/coffee-lab/${this.forumType}s/${event.value.question_slug}`], {
                    queryParams: { isAssignedToMe: this.isPostType.isAssignedToMe },
                });
            } else {
                this.router.navigate([`/coffee-lab/${this.forumType}s/${event.value.slug ?? event.value.id}`], {
                    queryParams: { isAssignedToMe: this.isPostType.isAssignedToMe },
                });
            }
        } else if (this.isPostType.isMyAnswer) {
            if (this.forumType === 'question') {
                this.router.navigate([`/coffee-lab/${this.forumType}s/${event.value.question_slug}`], {
                    queryParams: { isMyAnswer: this.isPostType.isMyAnswer },
                });
            } else {
                this.router.navigate([`/coffee-lab/${this.forumType}s/${event.value.slug ?? event.value.id}`], {
                    queryParams: { isMyAnswer: this.isPostType.isMyAnswer },
                });
            }
        } else {
            if (this.forumType === 'question') {
                this.router.navigate([`/coffee-lab/${this.forumType}s/${event.value.question_slug}`]);
            } else {
                this.router.navigate([`/coffee-lab/${this.forumType}s/${event.value.slug ?? event.value.id}`]);
            }
        }
    }
}
