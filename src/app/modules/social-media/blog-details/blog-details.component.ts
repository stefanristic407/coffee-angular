import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { DUMMY_BLOGS } from '@constants';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-blog-details',
    templateUrl: './blog-details.component.html',
    styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
    blogs = DUMMY_BLOGS;
    recentBlogs: any[] = [];
    blog: any;

    constructor(public location: Location, private toastrService: ToastrService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((param) => {
            this.blog = this.blogs.find((blog) => blog.id === Number(param.id));
            this.getRecentBlogs();
        });
    }

    getRecentBlogs(): void {
        this.recentBlogs = this.blogs.filter((blog) => blog.id !== this.blog.id);
    }

    copySuccessAlert() {
        this.toastrService.success('Media url is copied');
    }
}
