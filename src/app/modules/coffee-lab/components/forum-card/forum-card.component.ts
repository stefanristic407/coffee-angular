import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-forum-card',
    templateUrl: './forum-card.component.html',
    styleUrls: ['./forum-card.component.scss'],
})
export class ForumCardComponent implements OnInit {
    @Input() data?: any;
    @Input() forumType?: string;

    constructor(private router: Router) {}

    ngOnInit(): void {}

    onClick(): void {
        this.router.navigate([`/coffee-lab/${this.forumType}s/${this.data.slug}`]);
    }
}
