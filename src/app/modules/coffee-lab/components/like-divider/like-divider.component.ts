import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@shared';

@Component({
    selector: 'app-like-divider',
    templateUrl: './like-divider.component.html',
    styleUrls: ['./like-divider.component.scss'],
})
export class LikeDividerComponent implements OnInit {
    @Input() total: any;
    @Input() question: any;
    buttonList = [{ button: 'Roasting' }, { button: 'Coffee grinding' }, { button: 'Milling' }, { button: 'Brewing' }];
    showJoinBtn = true;
    isSaved = false;
    constructor(
        private router: Router,
        private activateRoute: ActivatedRoute,
        private coffeeLabService: CoffeeLabService,
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

    onLike() {
        this.coffeeLabService.updateLike('question', this.question.id).subscribe((res) => {
            if (res.success) {
                this.question.is_liked = true;
                this.question.likes = this.question.likes + 1;
            }
        });
    }

    onUnLike() {
        this.coffeeLabService.updateUnLike('question', this.question.id).subscribe((res) => {
            if (res.success) {
                this.question.is_liked = false;
                this.question.likes = this.question.likes - 1;
            }
        });
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
            this.router.navigate([this.getLink(this.question, this.question.answer).url], {
                queryParams: this.getLink(this.question, this.question.answer).queryParmas,
            });
        }
        document.getElementById('text-focus').focus();
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
