import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DirectMessagingComponent } from '../ordermanagement/direct-messaging/direct-messaging.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
// import * as $ from 'jquery';
declare var $: any;
import { TranslateService } from '@ngx-translate/core';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
    userName: string;
    selected: string;
    roasterId: any;
    userId: any;
    featureActive: any = 0;
    screenwidth: any = true;
    searchString: string;
    text: string;
    results: string[];
    profilePic: any;
    roasterProfilePic: any;
    supportLanguages = ['en', 'es'];
    lag: any;
    languages: any;
    appLanguage?: any;
    rolename: any;
    slugList: any;

    constructor(
        private elementRef: ElementRef,
        private cookieService: CookieService,
        private userService: UserserviceService,
        private roasterService: RoasterserviceService,
        private router: Router,
        private toastrService: ToastrService,
        private translateService: TranslateService,
        public globals: GlobalsService,
    ) {
        this.translateService.addLangs(this.supportLanguages);
        if (localStorage.getItem('locale')) {
            const browserLang = localStorage.getItem('locale');
            this.translateService.use(browserLang);
        } else {
            const browserlang = this.translateService.getBrowserLang();
            this.translateService.use(browserlang);
            localStorage.setItem('locale', 'en');
        }
    }

    ngOnInit(): void {
        this.roasterId = this.cookieService.get('roaster_id');
        this.userId = this.cookieService.get('user_id');
        this.getUserValue();
        this.getRoasterProfile();
        this.getLoggedInUserRoles();

        $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() === $(document).height()) {
                $('.sectin-footer-mb').css({
                    opacity: '0',
                    'pointer-events': 'none',
                });
            } else {
                $('.sectin-footer-mb').css({
                    opacity: '1',
                    'pointer-events': 'all',
                });
            }
        });

        const pt = $('header').outerHeight() + 'px';
        $('.router-design').css({ 'padding-top': pt });

        // Open side nav
        $('body').on('click', '.sidenav-hamberg', function (event) {
            $('.sidenav-mb').addClass('open');
            $('.sidenav-mb__content').addClass('open');
            event.stopImmediatePropagation();
        });

        $('body').on('click', '.sidenav-mb__close', function (event) {
            $('.sidenav-mb__content').removeClass('open');
            setTimeout(function () {
                $('.sidenav-mb').removeClass('open');
            }, 800);
            event.stopImmediatePropagation();
        });

        $('body').on('click', '.sidenav-mb__hide', function (event) {
            $('.sidenav-mb__content').removeClass('open');
            setTimeout(function () {
                $('.sidenav-mb').removeClass('open');
            }, 800);
            event.stopImmediatePropagation();
        });

        $('.nav-links__item .router-link').on('click', function (event) {
            $('.sidenav-mb__content').removeClass('open');
            setTimeout(function () {
                $('.sidenav-mb').removeClass('open');
            }, 800);
            event.stopImmediatePropagation();
        });
    }

    ngAfterViewInit() {
        $('.nav-links__item').on('click', function () {
            if ($(window).width() < 768) {
                $('.nav-links__item').not(this).find('.nav-dropdown').slideUp();
                $(this).find('.nav-dropdown').slideToggle();
                $('.nav-links__item').not(this).removeClass('active');
                $(this).toggleClass('active');
            } else {
                $('.nav-links__item').not(this).removeClass('active');
                $(this).addClass('active');
            }
        });

        $('.nav-dropdown li').on('click', function () {
            $('.nav-dropdown li').parents('.nav-links__item').not(this).removeClass('active');
            $(this).parents('.nav-links__item').addClass('active');
        });

        $(window).on('load', function () {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        });

        // Footer links

        $('body').on('click', '.footer-links__item', function () {
            $(this).parents('.footer-links').find('.footer-links__item').not(this).removeClass('active');
            $(this).addClass('active');
            $('.footer-links__item').find('.ft-dropdown').not(this).removeClass('active');

            $(this).find('.ft-dropdown').addClass('active');

            setTimeout(function () {
                $('.ft-dropdown').removeClass('active');
            }, 3500);
        });
    }

    getUserValue() {
        this.globals.permissionMethod();
        this.userService.getRoasterProfile(this.roasterId).subscribe((res: any) => {
            this.userName = res.result.firstname + ' ' + res.result.lastname;
            this.profilePic = res.result.profile_image_thumb_url;
            const language = res.result.language === '' ? 'en' : res.result.language;
            this.userService.getUserLanguageStrings(language).subscribe((resultLanguage) => {
                this.globals.languageJson = resultLanguage;
                this.appLanguage = this.globals.languageJson;
                this.featureActive++;
            });
        });
    }

    getLoggedInUserRoles() {
        this.roasterService.getLoggedinUserRoles(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.rolename = res.result[0].name;
            }
        });
    }

    getRoasterProfile() {
        this.userService.getRoasterAccount(this.roasterId).subscribe((res: any) => {
            if (res.result) {
                this.roasterProfilePic = res.result.company_image_thumbnail_url;
                this.featureActive++;
            } else {
                this.router.navigate(['/auth/login']);
            }
        });
    }

    userLogout() {
        this.userService.logOut().subscribe((res: any) => {
            if (res.success) {
                this.cookieService.deleteAll();
                this.router.navigate(['/login']);
                this.toastrService.success('Logout successfully !');
            } else {
                this.toastrService.error('Error while Logout!');
            }
        });
    }

    search(event: any) {
        const searchArray = Object.keys(this.globals.menuSearch);
        console.log('Search Array: ', searchArray);

        const localArray = [];
        searchArray.forEach((element) => {
            if (element.toLowerCase().indexOf(event.query.toLowerCase()) !== -1) {
                localArray.push(element);
            }
        });
        this.results = localArray;
        console.log('Search Text: ', this.text);
    }

    redirect(event: any) {
        console.log('Triggered');
        console.log(event);
        this.router.navigate([this.globals.menuSearch[event]]);
    }
}
