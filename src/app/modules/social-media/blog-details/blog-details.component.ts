import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { GlobalsService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-blog-details',
    templateUrl: './blog-details.component.html',
    styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
    backValue: any;
    constructor(private router: Router, private toastrService: ToastrService) {}

    ngOnInit(): void {}

    back() {
        this.backValue = true;
        this.router.navigateByUrl('/social-media/media/blogs');
    }

    copySuccessAlert() {
        this.toastrService.success('Media url is copied');
    }
}
