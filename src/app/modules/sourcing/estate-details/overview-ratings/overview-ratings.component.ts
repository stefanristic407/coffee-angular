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
    termStatus = 'Most relevant';
    termItems: any[];
    showRelavant = true;
    estateRatingActive: any = 0;

    constructor(
        public globals: GlobalsService,
        public sourcing: SourcingService,
        private roasterService: RoasterserviceService,
        private userService: UserserviceService,
    ) {
        this.termStatus = 'Most relevant';
    }

    ngOnInit(): void {
        this.termItems = [
            { label: this.globals.languageJson?.most_relevant, value: 'Most relevant' },
            { label: this.globals.languageJson?.recent_reviews, value: 'Recent reviews' },
            { label: this.globals.languageJson?.based_on_rating, value: 'Based on rating' },
        ];
    }

    filterCall() {
        console.log('Term:', this.termStatus);
    }
}
