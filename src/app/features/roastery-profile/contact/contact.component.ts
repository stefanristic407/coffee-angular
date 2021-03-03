import { Component, OnInit } from '@angular/core';
import { RoasteryProfileService } from '../roastery-profile.service';

declare var $: any;
import { GlobalsService } from '@services';

@Component({
    selector: 'sewn-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
    // name : string;
    // email : string;
    // phoneno : string;
    // city: string;
    // country : string = '';
    // state: string = "";
    // address1 : string;
    // address2 : string;
    // zipcode: string;
    // facebook : string;
    // instagram : string;
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

    ngOnInit(): void {
        this.language();
        let selectedVal = '+91';
        let EnteredNum;
        const optionText = [
            'IND 91',
            'USA 1',
            'AUS 61',
            'ITA 39',
            'Ban 880',
            'SWE 46',
            'AFG 93',
            'UK 44',
            'UAE 971',
            'CHE 41',
            'SAU 966',
            'PRT 351',
            'PO 48',
            'NOR 47',
            'NZL 64',
            'GER 49',
            'FRA 33',
            'DNK 45',
            'CHN 86',
            'PAK 92',
        ];
        // Phone Number selection
        const optionLen = $('.phone-number').find('.select-list');

        for (const option of optionText) {
            const optionVal = '<li class="select-list__item">' + option + '</li>';
            optionLen.append(optionVal);
        }

        $('.entered-number').on('input', function () {
            EnteredNum = $(this).val();
            const Num = '+' + parseInt(selectedVal + EnteredNum, 10);
            $(this).parents('.phone-number').find('.hidden-phone-num').val(Num);
            const s = $(this).parents('.phone-number').find('.hidden-phone-num').val();
        });

        $('body').on('click', '.select-list li', function () {
            const $thisVal = $(this).text();
            selectedVal = $thisVal.replace(/[^0-9]/gi, '');
            console.log(selectedVal);
            $(this)
                .parents('.phone-number')
                .find('.Selected-ISD')
                .text('+' + selectedVal);
            const Num = '+' + parseInt(selectedVal + EnteredNum, 10);
            $(this).parents('.phone-number').find('.hidden-phone-num').val(Num);
            const s = $(this).parents('.phone-number').find('.hidden-phone-num').val();
            $(this).parents('.phone-number').find('.select-list').toggleClass('active');
            $('.Selected-ISD').toggleClass('active');
            // this.numb = String(Num);
            // console.log(this.numb)
        });

        $('.Selected-ISD').on('click', function () {
            $(this).toggleClass('active');
            $(this).parents('.phone-number').find('.select-list').toggleClass('active');
        });
    }

    onKeyPress(event: any) {
        if (event.target.value === '') {
            document.getElementById(event.target.id).style.border = '1px solid #D50000';
        } else {
            document.getElementById(event.target.id).style.border = '1px solid #d6d6d6';
        }
    }

    language() {
        this.appLanguage = this.globals.languageJson;
        this.contactActive++;
    }

    //  Function Name :Country Selection .
    // Description: To select a country.

    changeCountry() {
        console.log('the selected country is : ');
        this.roasteryProfileService.changeCountry(this.roasteryProfileService.country);
    }
}
