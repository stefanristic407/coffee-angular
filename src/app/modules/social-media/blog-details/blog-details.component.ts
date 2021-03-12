import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-blog-details',
    templateUrl: './blog-details.component.html',
    styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
    constructor(private router: Router, private toastrService: ToastrService) {}

    ngOnInit(): void {}

    back() {
        this.router.navigateByUrl('/social-media/media/blogs');
    }

    copySuccessAlert() {
        this.toastrService.success('Media url is copied');
    }
}
