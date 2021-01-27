import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { SourcingService } from '../../sourcing.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';

@Component({
    selector: 'app-land-lots',
    templateUrl: './land-lots.component.html',
    styleUrls: ['./land-lots.component.scss'],
})
export class LandLotsComponent implements OnInit {
    appLanguage?: any;
    landLotsActive: any = 0;
    flavourName: any;
    brandProfileEstateWeb: string = 'https://qa-brand-profile.sewnstaging.com/estatebrandprofile/production-details';

    constructor(
        public globals: GlobalsService,
        public sourcing: SourcingService,
        private roasterService: RoasterserviceService,
    ) {}

    ngOnInit(): void {
        this.language();
        this.sourcing.lotsList();
        this.sourcing.flavourprofileList();
    }

    language() {
        this.appLanguage = this.globals.languageJson;
        this.landLotsActive++;
    }

    viewLot() {
        const redirectUrl = this.brandProfileEstateWeb;
        this.roasterService.navigate(redirectUrl, true);
    }
}
