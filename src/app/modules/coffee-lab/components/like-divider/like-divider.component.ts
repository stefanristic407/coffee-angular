import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-like-divider',
    templateUrl: './like-divider.component.html',
    styleUrls: ['./like-divider.component.scss'],
})
export class LikeDividerComponent implements OnInit {
    @Input() total: any;
    @Input() question: any;
    @Input() isMyPost = false;
    @Input() isSavedPost = false;
    @Input() isAssignedToMe = false;
    @Output() commentBoxClicked = new EventEmitter<boolean>();
    showJoinBtn = true;
    submitted = false;

    constructor(
        private activateRoute: ActivatedRoute,
        private coffeeLabService: CoffeeLabService,
        private router: Router,
        private toastService: ToastrService,
    ) {}

    ngOnInit(): void {
        if (this.activateRoute.snapshot.params.idOrSlug || this.activateRoute.snapshot.params.slug) {
            this.showJoinBtn = false;
        }
    }

    getLink(item: any, answer: any) {
        const url = `/coffee-lab/questions/${item.slug}`;
        return {
            url,
            queryParmas: {
                answer: answer?.id,
            },
        };
    }

    changeLike() {
        this.submitted = true;
        if (this.question.is_liked) {
            this.coffeeLabService.updateUnLike('question', this.question.id).subscribe((res) => {
                if (res.success) {
                    this.question.is_liked = false;
                    this.question.likes = this.question.likes - 1;
                }
                this.submitted = false;
            });
        } else {
            this.coffeeLabService.updateLike('question', this.question.id).subscribe((res) => {
                if (res.success) {
                    this.question.is_liked = true;
                    this.question.likes = this.question.likes + 1;
                }
                this.submitted = false;
            });
        }
    }

    onSave(): void {
        this.coffeeLabService.saveForum('question', this.question.id).subscribe((res: any) => {
            if (res.success) {
                this.question.is_saved = true;
                this.toastService.success('Successfully saved');
            } else {
                this.toastService.error('Error while save post');
            }
        });
    }

    onJoin() {
        if (this.question) {
            if (this.isSavedPost) {
                this.router.navigate([this.getLink(this.question, this.question.answer).url], {
                    queryParams: {
                        isSavedPost: true,
                    },
                });
            } else if (this.isMyPost) {
                this.router.navigate([this.getLink(this.question, this.question.answer).url], {
                    queryParams: {
                        isMyPost: true,
                    },
                });
            } else if (this.isAssignedToMe) {
                this.router.navigate([this.getLink(this.question, this.question.answer).url], {
                    queryParams: {
                        isAssignedToMe: true,
                    },
                });
            } else {
                this.router.navigate([this.getLink(this.question, this.question.answer).url]);
            }
        }
        this.commentBoxClicked.emit(true);
    }

    onSameSave(): void {
        this.coffeeLabService.unSaveFormByType('question', this.question.id).subscribe((res: any) => {
            if (res.success) {
                this.toastService.success(`You have removed the question successfully from saved posts.`);
                this.question.is_saved = false;
            } else {
                this.toastService.error(`Failed to remmove a question from saved posts.`);
            }
        });
    }
}
