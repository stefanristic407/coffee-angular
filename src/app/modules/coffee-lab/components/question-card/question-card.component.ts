import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService, CoffeeLabService } from '@services';

@Component({
    selector: 'app-question-card',
    templateUrl: './question-card.component.html',
    styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit {
    @Input() question: any;
    @Input() isMyPost = false;
    @Input() isSavedPost = false;
    @Input() isAssignedToMe = false;
    questionMenuItems: MenuItem[] = [];
    totalRecords = 0;
    displayData: any[] = [];

    constructor(private router: Router, public coffeeLabService: CoffeeLabService, public authService: AuthService) {}

    ngOnInit(): void {}

    onQuestionNavigate(slug) {
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
}
