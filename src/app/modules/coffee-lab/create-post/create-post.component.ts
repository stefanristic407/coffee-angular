import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
    drafts: any[] = [];
    selectedType: string;
    orignId: number;
    forumDeleteSub: Subscription;

    constructor(
        public location: Location,
        public dialogService: DialogService,
        private coffeeLabService: CoffeeLabService,
        private activateRoute: ActivatedRoute,
        private toastService: ToastrService,
        private router: Router,
    ) {
        this.activateRoute.queryParams.subscribe((res) => {
            this.selectedType = res?.type || res.forumType;
            this.orignId = res?.origin_id;
        });
    }

    ngOnInit(): void {
        this.getDrafts();
        this.forumDeleteSub = this.coffeeLabService.forumDeleteEvent.subscribe(() => {
            this.getDrafts();
        });
    }

    getDrafts(): void {
        this.coffeeLabService.getDrafts().subscribe((res: any) => {
            if (res.success) {
                this.drafts = res.result;
                this.coffeeLabService.allDrafts.next(this.drafts || []);
            } else {
                this.toastService.error('Failed to get drafts');
            }
        });
    }

    onBack() {
        let type: string;
        if (this.selectedType === 'question' || this.selectedType === 'answer' || this.selectedType === 'draft') {
            type = 'qa-forum';
        } else if (this.selectedType === 'recipe') {
            type = 'coffee-recipes';
        } else {
            type = this.selectedType + 's';
        }
        this.router.navigateByUrl('/coffee-lab/overview/' + type);
    }
}
