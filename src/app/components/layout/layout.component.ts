import { AfterViewInit, Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, fromEvent, interval } from 'rxjs';
import { filter, takeUntil, debounce, debounceTime } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import {
    AuthService,
    ChatHandlerService,
    CoffeeLabService,
    CommonService,
    GlobalsService,
    I18NService,
    IdmService,
    MenuService,
    RoasterserviceService,
    SocketService,
    UserserviceService,
    UserService,
    AclService,
} from '@services';
import { DestroyableComponent } from '@base-components';
import { OrganizationType } from '@enums';
import { environment } from '@env/environment';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    providers: [MenuService],
})
export class LayoutComponent extends DestroyableComponent implements OnInit, AfterViewInit, OnDestroy {
    menuItems: any[];
    selected: string;
    roasterId: any;
    userId: any;
    loaded = false;
    screenwidth: any = true;
    searchString: string;
    showSearch = false;
    searchResults: string[];
    rolename: any;
    slugList: any;
    sideNavOpened = false;
    showMobFooter = true;
    orgData: any[];

    notifications: any[];
    readNotification: any;

    activeLink: 'DASHBOARD' | 'MESSAGES' | 'NOTIFICATIONS' | 'PROFILES' | 'UNSET' = 'UNSET';
    resizeEvent: Subscription;
    userTermsAccepted: boolean;
    orgTermsAccepted: boolean;

    constructor(
        private cookieService: CookieService,
        private userOriginalService: UserserviceService,
        private userService: UserService,
        private roasterService: RoasterserviceService,
        private router: Router,
        private toastrService: ToastrService,
        private i18NService: I18NService,
        public globals: GlobalsService,
        public chat: ChatHandlerService,
        public menuService: MenuService,
        private socket: SocketService,
        private commonService: CommonService,
        private coffeeLabService: CoffeeLabService,
        private idmService: IdmService,
        public authService: AuthService,
        private aclService: AclService,
    ) {
        super();
    }

    ngOnInit(): void {
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
                this.getUserDetail(resolve);
            }),
        );
        promises.push(
            new Promise((resolve) => {
                this.getOrgProfile(resolve);
            }),
        );
        const self = this;
        Promise.all(promises).then(() => {
            if (!self.orgTermsAccepted || !self.userTermsAccepted) {
                this.router.navigate(['/auth/privacy-policy'], {
                    queryParams: {
                        type: encodeURIComponent(this.orgTermsAccepted ? 'user' : 'org'),
                    },
                });
            } else {
                self.loaded = true;
                setTimeout(() => {
                    self.menuService.expandActiveSubMenu();
                });
                this.refreshMenuItems();
            }
        });

        this.getLoggedInUserRoles();
        this.getOrganizations();

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

    refreshMenuItems() {
        this.menuItems = this.menuService.getMenuItems().filter((element) => element.routerLink);
        this.menuItems.forEach((element) => {
            element.title = this.globals.languageJson[element.title] || element.title;
        });
    }

    getNotificationList() {
        this.userOriginalService.getNofitication().subscribe((res: any) => {});
    }

    showNotification() {}

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

    getUserDetail(resolve) {
        this.aclService.loadPermission();
        this.userService.getUserDetail().subscribe((res: any) => {
            if (res.success) {
                this.userTermsAccepted = res.result.terms_accepted;
                this.coffeeLabService.forumLanguage.next(res.result.language || 'en');
                this.authService.userSubject.next(res.result);
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

    getOrgProfile(resolve) {
        this.userOriginalService.getRoasterAccount(this.roasterId).subscribe((res: any) => {
            if (res.result) {
                this.orgTermsAccepted = res.result.terms_accepted || !('terms_accepted' in res.result);
                this.authService.organizationSubject.next(res.result);
                resolve();
            } else {
                this.router.navigate(['/auth/login']);
            }
        });
    }

    userLogout() {
        this.userOriginalService.logOut().subscribe((res: any) => {
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
    }

    getOrganizations() {
        this.idmService.verifyToken().subscribe((res: any) => {
            if (res.success === true) {
                this.checkOrgRes(res.result);
            }
        });
    }

    checkOrgRes(orgRes: any) {
        this.orgData = [];
        Object.keys(orgRes).forEach((key) => {
            switch (key) {
                case 'estates': {
                    this.orgData.push({ orgType: OrganizationType.ESTATE, ...orgRes[key] });
                    break;
                }
                case 'facilitators': {
                    this.orgData.push({ orgType: OrganizationType.FACILITATOR, ...orgRes[key] });
                    break;
                }
                case 'horecas': {
                    this.orgData.push({ orgType: OrganizationType.HORECA, ...orgRes[key] });
                    break;
                }
                case 'micro_roasters': {
                    this.orgData.push({ orgType: OrganizationType.MICRO_ROASTER, ...orgRes[key] });
                    break;
                }
                case 'sewn_admin': {
                    this.orgData.push({
                        orgType: OrganizationType.SEWN_ADMIN,
                        id: orgRes.user_id,
                        ...orgRes[key],
                    });
                    break;
                }
            }
        });
    }

    switchPortal(orgType: OrganizationType, orgId) {
        let portalUrl = '';

        switch (orgType) {
            case OrganizationType.ESTATE: {
                portalUrl = environment.estatesWeb;
                break;
            }
            case OrganizationType.FACILITATOR: {
                portalUrl = environment.facilitatorWeb;
                break;
            }
            case OrganizationType.HORECA: {
                portalUrl = environment.horecaWeb;
                break;
            }
            case OrganizationType.MICRO_ROASTER: {
                portalUrl = environment.microRoasterWeb;
                break;
            }
            case OrganizationType.ROASTER: {
                portalUrl = environment.roasterWeb;
                break;
            }
            case OrganizationType.SEWN_ADMIN: {
                portalUrl = environment.adminWeb;
                break;
            }
        }

        portalUrl += `/gate?orgId=${orgId}`;
        // Probably we need to add separate flag for this logic.
        if (!environment.production) {
            portalUrl += `&token=${this.cookieService.get('Auth')}`;
        }

        window.open(portalUrl, '_self');
    }
}