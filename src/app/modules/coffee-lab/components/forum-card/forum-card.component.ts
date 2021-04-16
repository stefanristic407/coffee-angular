import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-forum-card',
    templateUrl: './forum-card.component.html',
    styleUrls: ['./forum-card.component.scss'],
})
export class ForumCardComponent implements OnInit {
    @Input() data?: any;
    @Input() forumType?: string;
    items: MenuItem[] = [
        {
            items: [
                {
                    label: 'Share',
                    command: () => {
                        this.onShare();
                    },
                },
                {
                    label: 'Save Post',
                    command: () => {
                        this.onSavePost();
                    },
                },
            ],
        },
    ];

    constructor(private router: Router) {}

    ngOnInit(): void {}

    onClick(): void {
        this.router.navigate([`/coffee-lab/${this.forumType}/${this.data.slug}`]);
    }

    onShare(): void {}
    onSavePost(): void {}
}
