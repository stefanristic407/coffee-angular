import { Component, OnInit } from '@angular/core';
import { RoasteryProfileService } from '../roastery-profile.service';

declare var $: any;
import { GlobalsService } from '@services';

@Component({
    selector: 'app-sewn-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
    nameError: string;
    emailError: string;
    phoneError: string;
    countryError: string;
    addressError: string;
    cityError: string;
    appLanguage?: any;
    contactActive: any = 0;

    constructor(public roasteryProfileService: RoasteryProfileService, public globals: GlobalsService) {
        this.nameError = '';
        this.emailError = '';
        this.phoneError = '';
        this.countryError = '';
        this.addressError = '';
        this.cityError = '';
    }

    ngOnInit(): void {}

    telInputObject(obj: any): void {
        if (this.roasteryProfileService.phoneno) {
            obj.setNumber(this.roasteryProfileService.phoneno);
        }
    }
    changeCountry() {
        console.log('the selected country is : ');
        this.roasteryProfileService.changeCountry(this.roasteryProfileService.country);
    }
}
