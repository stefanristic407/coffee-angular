import { SocketService, ChatHandlerService, CommonService } from '@services';
import { AfterViewInit, Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from '@services';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { TranslateService } from '@ngx-translate/core';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { filter, takeUntil } from 'rxjs/operators';
import { MenuService } from '@services';
import { DestroyableComponent } from '@base-components';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    providers: [MenuService],
})
export class LayoutComponent extends DestroyableComponent implements OnInit, AfterViewInit, OnDestroy {
    menuItems: any[];
    userName: string;
    selected: string;
    roasterId: any;
    userId: any;
    loaded = false;
    screenwidth: any = true;
    searchString: string;
    showSearch = false;
    searchResults: string[];
    profilePic: any;
    roasterProfilePic: any;
    supportLanguages = ['en', 'es'];
    rolename: any;
    slugList: any;

    notifications: any[];
    readNotification: any;

    activeLink: 'DASHBOARD' | 'MESSAGES' | 'NOTIFICATIONS' | 'PROFILES' | 'UNSET' = 'UNSET';
    profileUpdateEvent$?: Subscription;

    constructor(
        private elementRef: ElementRef,
        private cookieService: CookieService,
        private userService: UserserviceService,
        private roasterService: RoasterserviceService,
        private router: Router,
        private toastrService: ToastrService,
        private translateService: TranslateService,
        public globals: GlobalsService,
        public chat: ChatHandlerService,
        public menuService: MenuService,
        private socket: SocketService,
        private commonService: CommonService,
    ) {
        super();
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
        this.profileUpdateEvent$ = this.commonService.profileUpdateEvent.subscribe((profileInfo: any) => {
            this.handleProfileUpdateEvent(profileInfo);
        });
        this.socket.initSocketService(); // Enable socket service
        this.chat.isOpen.pipe(takeUntil(this.unsubscribeAll$)).subscribe((x) => {
            if (x) {
                this.activeLink = 'MESSAGES';
                if (window.innerWidth <= 767) {
                    document.body.style.overflow = 'hidden';
                }
            } else {
                document.body.style.overflow = '';
                this.updateActiveLinkState();
            }
        });
        this.router.events
            .pipe(takeUntil(this.unsubscribeAll$))
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                window.scrollTo(0, 0);
                this.updateActiveLinkState();
                this.menuService.expandActiveSubMenu();
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        $('.sidenav-mb').removeClass('open');
                    }, 800);
                }
            });

        this.updateActiveLinkState();
        this.roasterId = this.cookieService.get('roaster_id');
        this.userId = this.cookieService.get('user_id');
        const promises = [];
        promises.push(
            new Promise((resolve) => {
                this.getUserValue(resolve);
            }),
        );
        promises.push(
            new Promise((resolve) => {
                this.getRoasterProfile(resolve);
            }),
        );
        const self = this;
        Promise.all(promises).then(() => {
            self.loaded = true;
            setTimeout(() => {
                self.menuService.expandActiveSubMenu();
            });
            this.refreshMenuItems();
        });

        this.getLoggedInUserRoles();

        $(window).scroll(() => {
            if (!this.chat.isOpen.value) {
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
            } else {
                $('.sectin-footer-mb').css({
                    opacity: '1',
                    'pointer-events': 'all',
                });
            }
        });

        $('body').on('click', '.sidenav-mb__close', (event) => {
            $('.sidenav-mb__content').removeClass('open');
            setTimeout(() => {
                $('.sidenav-mb').removeClass('open');
            }, 800);
            event.stopImmediatePropagation();
        });

        $('body').on('click', '.sidenav-mb__hide', (event) => {
            $('.sidenav-mb__content').removeClass('open');
            setTimeout(() => {
                $('.sidenav-mb').removeClass('open');
            }, 800);
            event.stopImmediatePropagation();
        });

        this.getNotificationList();
    }

    handleProfileUpdateEvent(profileInfo: any) {
        this.userName = profileInfo.firstname + ' ' + profileInfo.lastname;
        this.profilePic = profileInfo.profile_image_thumb_url;
    }

    refreshMenuItems() {
        this.menuItems = this.menuService.getMenuItems().filter((element) => element.routerLink);
        this.menuItems.forEach((element) => {
            element.title = this.globals.languageJson[element.title] || element.title;
        });
    }

    getNotificationList() {
        this.userService.getNofitication().subscribe((res: any) => {
            console.log('notification data: ', res);
        });
    }

    showNotification() {
        console.log('notif show: ');
    }

    updateActiveLinkState() {
        if (this.chat.isOpen.value) {
            this.activeLink = 'MESSAGES';
        } else if (this.router.url.includes('/features/roastery-profile/about_roastery')) {
            this.activeLink = 'PROFILES';
        } else if (this.router.url.includes('/features/notification')) {
            this.activeLink = 'NOTIFICATIONS';
        } else if (this.router.url.includes('/')) {
            this.activeLink = 'DASHBOARD';
        } else {
            this.activeLink = 'UNSET';
        }
    }

    ngAfterViewInit() {}

    getUserValue(resolve) {
        this.globals.permissionMethod();
        this.userService.getRoasterProfile(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.userName = res.result.firstname + ' ' + res.result.lastname;
                this.profilePic = res.result.profile_image_thumb_url;
                const language = res.result.language === '' ? 'en' : res.result.language;
                this.userService.getUserLanguageStrings(language).subscribe((resultLanguage) => {
                    this.globals.languageJson = resultLanguage;
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    getLoggedInUserRoles() {
        this.roasterService.getLoggedinUserRoles(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.rolename = res.result[0].name;
            }
        });
    }

    getRoasterProfile(resolve) {
        this.userService.getRoasterAccount(this.roasterId).subscribe((res: any) => {
            if (res.result) {
                this.roasterProfilePic = res.result.company_image_thumbnail_url;
                resolve();
            } else {
                this.router.navigate(['/auth/login']);
            }
        });
    }

    userLogout() {
        this.userService.logOut().subscribe((res: any) => {
            if (res.success) {
                this.cookieService.deleteAll();
                this.router.navigate(['/gate']);
                this.toastrService.success('Logout successfully !');
            } else {
                this.toastrService.error('Error while Logout!');
            }
        });
    }

    search() {
        if (this.searchString) {
            this.openSearchPanel();
        }
        const localArray = [];
        this.menuItems.forEach((element) => {
            if (element.title.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1) {
                localArray.push(element);
            }
        });
        this.searchResults = localArray;
    }

    openSearchPanel() {
        if (!this.showSearch) {
            this.showSearch = true;
            window.scrollTo(0, 0);
        }
    }

    closeSearchPanel() {
        this.searchString = null;
        this.searchResults = null;
        this.showSearch = false;
        window.scrollTo(0, 0);
    }

    closeMessagePanel() {
        this.chat.closeChatPanel();
    }

    toggleMessagePanel() {
        this.chat.toggle();
    }

    redirect(event: any) {
        this.router.navigateByUrl(event.routerLink);
    }

    openSideNav() {
        $('.sidenav-mb').addClass('open');
        $('.sidenav-mb__content').addClass('open');
    }

    showFooter() {
        return !this.router.url.includes('/dispute-system/order-chat/');
    }

    ngOnDestroy(): void {
        this.socket.destorySocket();
        this.profileUpdateEvent$?.unsubscribe();
    }
}
