import { Component, OnInit, Input } from '@angular/core';
import { GlobalsService } from '@services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-translation-dropdown',
    templateUrl: './translation-dropdown.component.html',
    styleUrls: ['./translation-dropdown.component.scss'],
})
export class TranslationDropdownComponent implements OnInit {
    @Input() translatedList: any[] = [];
    @Input() forumType?: string;
    isPostType: any;

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.queryParams.subscribe((res) => {
            this.isPostType = res;
        });
    }

    ngOnInit(): void {}

    onChangeTranslate(event: any): void {
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
        } else if (this.isPostType.isSavePost) {
            if (this.forumType === 'question') {
                this.router.navigate([`/coffee-lab/${this.forumType}s/${event.value.question_slug}`], {
                    queryParams: { isSavePost: this.isPostType.isSavePost },
                });
            } else {
                this.router.navigate([`/coffee-lab/${this.forumType}s/${event.value.slug ?? event.value.id}`], {
                    queryParams: { isSavePost: this.isPostType.isSavePost },
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
