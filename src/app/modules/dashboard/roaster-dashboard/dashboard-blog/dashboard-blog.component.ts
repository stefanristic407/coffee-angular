import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { DUMMY_BLOGS } from '@constants';

@Component({
    selector: 'app-dashboard-blog',
    templateUrl: './dashboard-blog.component.html',
    styleUrls: ['./dashboard-blog.component.scss'],
})
export class DashboardBlogComponent implements OnInit {
    blogs = DUMMY_BLOGS;

    constructor(public globals: GlobalsService) {}

    ngOnInit(): void {}
}
