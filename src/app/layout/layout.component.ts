import { Subscription } from 'rxjs';
import { ChatService } from './../components/sewn-direct-message/chat.service';
import { AfterViewInit, Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { TranslateService } from '@ngx-translate/core';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
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
    chatStateSubcription: Subscription;
    routeSubscription: Subscription;

    activeLink: 'DASHBOARD' | 'MESSAGES' | 'NOTIFICATIONS' | 'PROFILES' | 'UNSET' = 'UNSET';

    constructor(
        private elementRef: ElementRef,
        private cookieService: CookieService,
        private userService: UserserviceService,
        private roasterService: RoasterserviceService,
        private router: Router,
        private toastrService: ToastrService,
        private translateService: TranslateService,
        public globals: GlobalsService,
        public chat: ChatService,
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
        this.chatStateSubcription = this.chat.isOpen.subscribe(x => {
            if (x) {
                this.activeLink = 'MESSAGES';
            } else {
                this.updateActiveLinkState();
            }
        });
        this.routeSubscription = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            ).subscribe((event: NavigationEnd) => {
                this.updateActiveLinkState();
            });

        this.updateActiveLinkState();
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
    ngOnDestroy() {
        if (this.chatStateSubcription) {
            this.chatStateSubcription.unsubscribe();
        }
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }
    }
    updateActiveLinkState() {
        if (this.chat.isOpen.value) {
            this.activeLink = 'MESSAGES';
        } else if (this.router.url.includes('/features/roastery-profile/about_roastery')) {
            this.activeLink = 'PROFILES';
        } else if (this.router.url.includes('/features/notification')) {
            this.activeLink = 'NOTIFICATIONS';
        } else if (this.router.url.includes('/features/welcome-aboard')) {
            this.activeLink = 'DASHBOARD';
        } else {
            this.activeLink = 'UNSET';
        }
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

    openMessagePanel() {
        this.chat.showChatPanel();
    }
    closeMessagePanel() {
        this.chat.closeChatPanel();
    }

    toggleMessagePanel() {
        this.chat.toggle();
    }

    redirect(event: any) {
        console.log('Triggered');
        console.log(event);
        this.router.navigate([this.globals.menuSearch[event]]);
    }
}
