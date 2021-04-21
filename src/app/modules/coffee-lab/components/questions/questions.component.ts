import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
    @Input() questions: any[] = [];
    @Input() viewMode = 'list';
    questionMenuItems: MenuItem[] = [];
    pageDesc: string | undefined;
    isMyPostsPage = false;

    constructor(
        private coffeeLabService: CoffeeLabService,
        private toastService: ToastrService,
        private activateRoute: ActivatedRoute,
    ) {
        this.pageDesc = this.activateRoute.snapshot.routeConfig?.path;
    }

    ngOnInit(): void {
        if (this.pageDesc === 'my-posts') {
            this.isMyPostsPage = true;
        }
    }
}
