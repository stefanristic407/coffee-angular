import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LinkType } from '@enums';
import { AuthService, CoffeeLabService } from '@services';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-question-card',
    templateUrl: './question-card.component.html',
    styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit {
    readonly qaLink = LinkType.QA;
    @Input() question: any;
    @Input() isMyPost = false;
    @Input() isSavedPost = false;
    @Input() isAssignedToMe = false;
    questionMenuItems: MenuItem[] = [];
    isLikedBtn = true;

    constructor(private router: Router, public coffeeLabService: CoffeeLabService, public authService: AuthService) {}

    ngOnInit(): void {}

    onQuestionNavigate(slug: string) {
        if (this.isMyPost) {
            this.router.navigate(['/coffee-lab/questions/' + slug], {
                queryParams: {
                    isMyPost: true,
                },
            });
        } else if (this.isSavedPost) {
            this.router.navigate(['/coffee-lab/questions/' + slug], {
                queryParams: {
                    isSavedPost: true,
                },
            });
        } else if (this.isAssignedToMe) {
            this.router.navigate(['/coffee-lab/questions/' + slug], {
                queryParams: {
                    isAssignedToMe: true,
                },
            });
        } else {
            this.router.navigateByUrl('/coffee-lab/questions/' + slug);
        }
    }

    onLike(answer) {
        this.isLikedBtn = false;
        this.coffeeLabService.updateLike('answer', answer.id).subscribe((res) => {
            if (res.success) {
                answer.is_liked = true;
                answer.likes = answer.likes + 1;
                this.isLikedBtn = true;
            }
        });
    }

    onUnLike(answer) {
        this.isLikedBtn = false;
        this.coffeeLabService.updateUnLike('answer', answer.id).subscribe((res) => {
            if (res.success) {
                answer.is_liked = false;
                answer.likes = answer.likes - 1;
                this.isLikedBtn = true;
            }
        });
    }
}
