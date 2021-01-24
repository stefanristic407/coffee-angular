import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { SourcingService } from '../../sourcing.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { UserserviceService } from 'src/services/users/userservice.service';

@Component({
    selector: 'app-overview-ratings',
    templateUrl: './overview-ratings.component.html',
    styleUrls: ['./overview-ratings.component.scss'],
})
export class OverviewRatingsComponent implements OnInit {
    totalstar = 5;
    newvalue: any = 2;
    reviewvalue: any = 4;
    termStatus: any;
    showRelavant: boolean = true;
    appLanguage?: any;
    estateRatingActive: any = 0;
    reviewsList: any;
    summaryList: any;
    overall: any;

    constructor(
        public globals: GlobalsService,
        public sourcing: SourcingService,
        private roasterService: RoasterserviceService,
        private userService: UserserviceService,
    ) {
        this.termStatus = 'Most relevant';
    }

    ngOnInit(): void {
        this.language();
    }
    language() {
        this.appLanguage = this.globals.languageJson;
        this.estateRatingActive++;
    }

    setStatus(term: any) {
        this.termStatus = term;
    }
    moreMethod() {
        let dots = document.getElementById('dots');
        let moreText = document.getElementById('more');
        let btnText = document.getElementById('read_id');

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
        let dots = document.getElementById('dots_two');
        let moreText = document.getElementById('more_two');
        let btnText = document.getElementById('read_id_two');

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
        let dots = document.getElementById('dots_three');
        let moreText = document.getElementById('more_three');
        let btnText = document.getElementById('read_id_three');

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
        let dots = document.getElementById('dots_contact1');
        let moreText = document.getElementById('more_contact1');
        let btnText = document.getElementById('read_contact1');

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
        let dots = document.getElementById('dots_contact2');
        let moreText = document.getElementById('more_contact2');
        let btnText = document.getElementById('read_contact2');

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
        let dots = document.getElementById('dots_contact3');
        let moreText = document.getElementById('more_contact3');
        let btnText = document.getElementById('read_contact3');

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
    //   getEstateReviews(){
    // 	this.userService.getEachEsateReviews(this.sourcing.detailList).subscribe(
    // 		res=>{
    // 			if(res['sucess']==true){
    // 				this.reviewsList=res['result'];
    // 				console.log(this.reviewsList);
    // 			}
    // 		}
    // 	)
    // }
    // getEstateSummary(){
    // 	this.userService.getEachEsateReviewsSummary(this.sourcing.detailList).subscribe(
    // 		res=>{
    // 			if(res['sucess']==true){
    // 				this.summaryList=res['result'];
    // 				console.log(this.summaryList);
    // 				this.overall=this.summaryList['average']['overall_experience'];
    // 			}
    // 		}
    // 	)
    // }
    changeDecimal(val: any) {
        if (val) {
            return parseFloat(val).toFixed(1);
        }
    }
    changeDecimalStar(data: any) {
        if (data) {
            return data.toFixed(2);
        }
    }
}
