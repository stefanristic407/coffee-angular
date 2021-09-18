import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { DraftPostsComponent } from '@modules/coffee-lab/create-post/draft-posts/draft-posts.component';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
    drafts: any[] = [];
    selectedType: string;
    orignId: number;
    constructor(
        public location: Location,
        public dialogService: DialogService,
        private toastrService: ToastrService,
        public coffeeLabService: CoffeeLabService,
        private activateRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.activateRoute.queryParams.subscribe((res) => {
            this.selectedType = res?.type;
            this.orignId = res?.origin_id;
        });
    }

    ngOnInit(): void {
        this.getDrafts();
    }

    getDrafts(): void {
        this.coffeeLabService.getDrafts().subscribe((res: any) => {
            if (res.success) {
                this.drafts = res.result || [];
            } else {
                this.toastrService.error('Failed to get drafts');
            }
        });
    }

    onOpenDraftPosts(): void {
        const dialogRef = this.dialogService.open(DraftPostsComponent, {
            showHeader: false,
            styleClass: 'draft-posts',
            data: this.drafts,
        });
        dialogRef.onClose.subscribe((res) => {
            this.getDrafts();
        });
    }

    onBack() {
        let type: string;
        if (this.selectedType === 'question' || this.selectedType === 'answer') {
            type = 'qa-forum';
        } else if (this.selectedType === 'recipe') {
            type = 'coffee-recipes';
        } else {
            type = this.selectedType + 's';
        }
        this.router.navigateByUrl('/coffee-lab/overview/' + type);
    }
}
