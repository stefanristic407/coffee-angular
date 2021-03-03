import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';

@Component({
    selector: 'sewn-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
    totalstar = 5;
    newvalue: any = 2;
    reviewvalue: any = 4;
    termStatus: any;
    showRelavant = true;
    appLanguage?: any;
    roasterId: any;
    reviews: any = [];
    isLoading?: boolean;

    constructor(
        public globals: GlobalsService,
        private roasterService: RoasterserviceService,
        private cookieService: CookieService,
    ) {
        this.termStatus = 'Most relevant';
    }

    ngOnInit(): void {
        this.appLanguage = this.globals.languageJson;
        this.roasterId = this.cookieService.get('roaster_id');
        this.getReviews();
    }

    getReviews(): void {
        this.isLoading = true;
        this.roasterService.getRoasterReviews(this.roasterId).subscribe((res) => {
            if (res.success) {
                this.isLoading = false;
                this.reviews = res.result ? res.result : [];
            }
        });
    }

    setStatus(term: any) {
        this.termStatus = term;
    }
    moreMethod() {
        const dots = document.getElementById('dots');
        const moreText = document.getElementById('more');
        const btnText = document.getElementById('read_id');

        if (dots.style.display === 'none') {
            dots.style.display = 'inline';
            btnText.innerHTML = 'Read more' + '<img class="pl-1" src="/assets/images/active-review.svg" />';
            moreText.style.display = 'none';
        } else {
            dots.style.display = 'none';
            btnText.innerHTML = 'Read less' + '<img class="pl-1" src="/assets/images/user-down.svg" />';
            moreText.style.display = 'inline';
        }
    }

    moreLess() {
        const dots = document.getElementById('dots_two');
        const moreText = document.getElementById('more_two');
        const btnText = document.getElementById('read_id_two');

        if (dots.style.display === 'none') {
            dots.style.display = 'inline';
            btnText.innerHTML = 'Read more' + '<img class="pl-1" src="/assets/images/active-review.svg" />';
            moreText.style.display = 'none';
        } else {
            dots.style.display = 'none';
            btnText.innerHTML = 'Read less' + '<img class="pl-1" src="/assets/images/user-down.svg" />';
            moreText.style.display = 'inline';
        }
    }
    lessMethod() {
        const dots = document.getElementById('dots_three');
        const moreText = document.getElementById('more_three');
        const btnText = document.getElementById('read_id_three');

        if (dots.style.display === 'none') {
            dots.style.display = 'inline';
            btnText.innerHTML = 'Read more' + '<img class="pl-1" src="/assets/images/active-review.svg" />';
            moreText.style.display = 'none';
        } else {
            dots.style.display = 'none';
            btnText.innerHTML = 'Read less' + '<img class="pl-1" src="/assets/images/user-down.svg" />';
            moreText.style.display = 'inline';
        }
    }

    communicationMore_one() {
        const dots = document.getElementById('dots_contact1');
        const moreText = document.getElementById('more_contact1');
        const btnText = document.getElementById('read_contact1');

        if (dots.style.display === 'none') {
            dots.style.display = 'inline';
            btnText.innerHTML = 'Read more' + '<img class="pl-1" src="/assets/images/active-review.svg" />';
            moreText.style.display = 'none';
        } else {
            dots.style.display = 'none';
            btnText.innerHTML = 'Read less' + '<img class="pl-1" src="/assets/images/user-down.svg" />';
            moreText.style.display = 'inline';
        }
    }
    communicationMore_two() {
        const dots = document.getElementById('dots_contact2');
        const moreText = document.getElementById('more_contact2');
        const btnText = document.getElementById('read_contact2');

        if (dots.style.display === 'none') {
            dots.style.display = 'inline';
            btnText.innerHTML = 'Read more' + '<img class="pl-1" src="/assets/images/active-review.svg" />';
            moreText.style.display = 'none';
        } else {
            dots.style.display = 'none';
            btnText.innerHTML = 'Read less' + '<img class="pl-1" src="/assets/images/user-down.svg" />';
            moreText.style.display = 'inline';
        }
    }
    communicationMore_three() {
        const dots = document.getElementById('dots_contact3');
        const moreText = document.getElementById('more_contact3');
        const btnText = document.getElementById('read_contact3');

        if (dots.style.display === 'none') {
            dots.style.display = 'inline';
            btnText.innerHTML = 'Read more' + '<img class="pl-1" src="/assets/images/active-review.svg" />';
            moreText.style.display = 'none';
        } else {
            dots.style.display = 'none';
            btnText.innerHTML = 'Read less' + '<img class="pl-1" src="/assets/images/user-down.svg" />';
            moreText.style.display = 'inline';
        }
    }
    toggleRelavant() {
        this.showRelavant = !this.showRelavant;
    }
}
