import { AfterViewInit, Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, fromEvent, interval } from 'rxjs';
import { filter, takeUntil, debounce, debounceTime } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import {
    ChatHandlerService, CoffeeLabService,
    CommonService,
    GlobalsService,
    I18NService,
    MenuService,
    RoasterserviceService,
    SocketService,
    UserserviceService,
} from '@services';
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
    rolename: any;
    slugList: any;
    sideNavOpened = false;
    showMobFooter = true;

    notifications: any[];
    readNotification: any;

    activeLink: 'DASHBOARD' | 'MESSAGES' | 'NOTIFICATIONS' | 'PROFILES' | 'UNSET' = 'UNSET';
    profileUpdateEvent$?: Subscription;
    resizeEvent: Subscription;
    constructor(
        private cookieService: CookieService,
        private userService: UserserviceService,
        private roasterService: RoasterserviceService,
        private router: Router,
        private toastrService: ToastrService,
        private i18NService: I18NService,
        public globals: GlobalsService,
        public chat: ChatHandlerService,
        public menuService: MenuService,
        private socket: SocketService,
        private commonService: CommonService,
        private coffeeLabService: CoffeeLabService
    ) {
        super();
    }

    ngOnInit(): void {
        this.profileUpdateEvent$ = this.commonService.profileUpdateEvent.subscribe((profileInfo: any) => {
            this.handleProfileUpdateEvent(profileInfo);
        });
        this.socket.initSocketService(); // Enable socket service
        this.chat.isOpen.pipe(takeUntil(this.unsubscribeAll$)).subscribe((x) => {
            if (x) {
                this.activeLink = 'MESSAGES';
                this.scrollFix();
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
                this.closeSideNav();
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

        fromEvent(window, 'scroll')
            .pipe(debounceTime(100))
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(() => {
                if (!this.chat.isOpen.value && this.showFooter()) {
                    if (window.scrollY + window.innerHeight === document.documentElement.scrollHeight) {
                        this.showMobFooter = false;
                    } else {
                        this.showMobFooter = true;
                    }
                } else {
                    this.showMobFooter = true;
                }
            });

        this.getNotificationList();
    }

    ngAfterViewInit() {
        this.resizeEvent = fromEvent(window, 'resize')
            .pipe(debounce(() => interval(500)))
            .subscribe(this.viewPortSizeChanged);
        this.viewPortSizeChanged();
    }

    viewPortSizeChanged = () => {
        this.scrollFix();
    };

    scrollFix() {
        if (window.innerWidth <= 767 && this.chat.isOpen.value) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
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

    getUserValue(resolve) {
        this.globals.permissionMethod();
        this.userService.getRoasterProfile(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.coffeeLabService.forumLanguage.next(res.result.language || 'en');
                this.userName = res.result.firstname + ' ' + res.result.lastname;
                this.profilePic = res.result.profile_image_thumb_url;
                this.i18NService.use(res.result.language || 'en');
            }
            resolve();
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

    closeSideNav() {
        this.sideNavOpened = false;
    }

    openSideNav() {
        this.sideNavOpened = true;
    }

    showFooter() {
        return !this.router.url.includes('/dispute-system/order-chat/');
    }

    ngOnDestroy(): void {
        if (this.resizeEvent && this.resizeEvent.unsubscribe) {
            this.resizeEvent.unsubscribe();
        }
        this.socket.destorySocket();
        this.profileUpdateEvent$?.unsubscribe();
    }
}
