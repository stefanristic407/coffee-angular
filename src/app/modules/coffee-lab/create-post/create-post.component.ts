import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DraftPostsComponent } from '@modules/coffee-lab/create-post/draft-posts/draft-posts.component';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';

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
        public coffeeLabService: CoffeeLabService,
        private activateRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.activateRoute.queryParams.subscribe((res) => {
            this.selectedType = res?.type || res.forumType;
            this.orignId = res?.origin_id;
        });
    }

    ngOnInit(): void {}

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
