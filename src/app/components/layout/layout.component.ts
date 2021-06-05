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
    orgData: any[];
    sideNavOpened = false;
    showMobFooter = true;

    notifications: any[];
    readNotification: any;

    activeLink: 'DASHBOARD' | 'COFFEELAB' | 'MESSAGES' | 'NOTIFICATIONS' | 'PROFILES' | 'UNSET' = 'UNSET';
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
        public aclService: AclService,
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
        fromEvent(window, 'resize')
            .pipe(takeUntil(this.unsubscribeAll$))
            .pipe(debounce(() => interval(500)))
            .subscribe(this.viewPortSizeChanged);
        this.viewPortSizeChanged();
    }

    ngOnDestroy(): void {
        this.socket.destorySocket();
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
        this.userOriginalService.getNofitication().subscribe((res: any) => {
            if (res.success) {
                this.notifications = res.result ?? [];
            }
        });
    }

    makeAsAllRead(element: any) {
        this.userOriginalService.makeAsAllRead().subscribe((res: any) => {
            if (res.success) {
                element.hide();
                this.getNotificationList();
            }
        });
    }

    onClickNotification(data: any, element: any, notification: any) {
        if (data.is_read) {
            element.hide();
        } else {
            this.userOriginalService.makeAsRead(data.id).subscribe((res: any) => {
                if (res.success) {
                    element.hide();
                    this.getNotificationList();
                }
            });
        }
        if (notification.url) {
            this.router.navigate([notification.url], {
                queryParams: notification.queryParams,
            });
        }
    }

    getContent(data) {
        let content = '';
        let url = '';
        let queryParams: any = {};
        if (data.event === 'cupping_request') {
            if (data.action === 'ASSIGNED') {
                content = `You have been assigned to grade Order #${data.content.order_id}.`;
            }
        } else if (data.event === 'dispute') {
            if (data.action === 'RAISED') {
                content = `A dispute against Order #${data.content.order_id} has been raised by ${
                    data.content.order_type === 'RO-MR' ? data.content.micro_roaster_name : data.content.estate_name
                }. View dispute for more details.`;
                url = `dispute-system/order-chat/${data.content.order_id}`;
                queryParams = {
                    orderType: data.content.order_type,
                    disputeID: data.dispute_id,
                };
            } else if (data.action === 'RESOLVED') {
                content = `${
                    data.content.order_type === 'RO-MR' ? data.content.micro_roaster_name : data.content.estate_name
                } has resolved the dispute against Order #${data.content.order_id}`;
                url = `dispute-system/order-chat/${data.content.order_id}`;
                queryParams = {
                    orderType: data.content.order_type,
                    disputeID: data.dispute_id,
                };
            } else if (data.action === 'ESCALATED') {
                content = `A dispute against Order #${data.content.order_id} has been escalated by ${
                    data.content.order_type === 'RO-MR' ? data.content.micro_roaster_name : data.content.estate_name
                }. View dispute for more details.`;
                url = `dispute-system/order-chat/${data.content.order_id}`;
                queryParams = {
                    orderType: data.content.order_type,
                    disputeID: data.dispute_id,
                };
            }
        } else if (data.event === 'invite') {
            if (data.action === 'COMPLETED') {
                content = `Your invite ${data.content.user_name} has successfully joined the platform.`;
                url = `/profile`;
                queryParams = {
                    user_id: data.content.user_id,
                    organization: 'ro',
                    organization_id: this.roasterId,
                };
            }
        } else if (data.event === 'api_key') {
            if (data.action === 'REQUESTED') {
                content = `${data.content.org_type === 'hrc' ? 'Partner' : 'Micro-roaster'} ${
                    data.content.org_name
                } has placed a request for API access.`;
                url = `/api-requests-list`;
            }
        } else if (data.event === 'onboarding') {
            if (data.action === 'COMPLETED') {
                content = `${data.content.horeca_name ? 'Partner' : 'Micro-roaster'} ${
                    data.content.horeca_name ?? data.content.micro_roaster_name
                } has successfully joined the platform.`;
                url = `/people/customer-management`;
            }
        } else if (data.event === 'prebook_order' || data.event === 'sample_order' || data.event === 'gc_order') {
            if (data.action === 'GRADE_REPORT_UPLOADED') {
                content = `A grade report has been uploaded to order #${data.content.order_id}.`;
                url = `/orders/es/${data.content.order_id}`;
            } else if (data.action === 'CONFIRM') {
                content = `${data.content.estate_name} has confirmed your order #${data.content.order_id}`;
                url = `/orders/es/${data.content.order_id}`;
            } else if (data.action === 'INVOICE_GENERATED') {
                content = `A proforma invoice has been generated for order #${data.content.order_id}`;
            } else if (data.action === 'REJECTED') {
                content = `${data.content.estate_name} has rejected your order #${data.content.order_id}`;
                url = `/orders/es`;
            } else if (data.action === 'CANCELLED') {
                content = `Era of We admin has cancelled your order #${data.content.order_id} with ${data.content.estate_name}.`;
                url = `/orders/es`;
            } else if (data.action === 'SHIPPED') {
                content = `${data.content.estate_name} has shipped order #${data.content.order_id}`;
                url = `/orders/es/${data.content.order_id}`;
            } else if (data.action === 'SHIPPED_INFO_UPDATED') {
                content = `Shipping information has been released for order #${data.content.order_id}.`;
                url = `/orders/es/${data.content.order_id}`;
            } else if (data.action === 'CREATED') {
                content = `The prebooked lot you requested is available. An order will automatically be created shortly.`;
                url = `/orders/es`;
            }
        } else if (data.event === 'mr_gc_order') {
            if (data.action === 'PLACED') {
                content = `Micro roaster ${data.content.micro_roaster_name} has placed a new order #${data.content.order_id}.`;
            } else if (data.action === 'RECEIVED') {
                content = `Micro roaster ${data.content.micro_roaster_name} has confirmed delivery of order #${data.content.order_id}.`;
                url = `/orders/mr`;
            } else if (data.action === 'COMPLETED') {
                content = `A QR code for your coffee experience story has been generated for order #${data.content.order_id}.`;
            }
        } else if (data.event === 'hrc_order') {
            if (data.action === 'PLACED') {
                content = `Customer ${data.content.horeca_name} has placed an order via EoW marketplace.`;
            } else if (data.action === 'RECEIVED') {
                content = `Customer ${data.content.horeca_name} has confirmed delivery of order #${data.content.order_id}.`;
            } else if (data.action === 'CANCELLED') {
                content = `Customer ${data.content.horeca_name} has cancelled order #${data.content.order_id}.`;
            } else if (data.action === 'COMPLETED') {
                content = `A QR code for your coffee experience story has been generated for order #${data.content.order_id}.`;
            }
        } else if (data.event === 'question') {
            if (data.action === 'ASSIGNED') {
                content = `Era of We Admin has assigned you a question in The Coffee Lab.`;
                url = `/coffee-lab/overview/assigned-to-me`;
            } else if (data.action === 'ANSWERED') {
                content = `A question in The Coffee Lab has been answered.`;
                url = `/coffee-lab/overview/qa-forum`;
            }
        } else if (data.event === 'cupping') {
            if (data.action === 'INVITED') {
                content = `You have been invited to grade Order #${data.content.cupping_request_id}`;
            }
        } else if (data.event === 'rating') {
            if (data.action === 'RECEIVED') {
                content = `You have a new rating for ${data.content.product_id ? 'product' : 'order'} #${
                    data.content.product_id ?? data.content.order_id
                }`;
                url = `/operator-profile/reviews`;
            }
        } else if (data.event === 'commission_invoice') {
            if (data.action === 'PAID') {
                content = `Payment for your commission invoice #${data.content.invoice_number} has been confirmed.`;
            }
        }
        return { content, url, queryParams };
    }

    updateActiveLinkState() {
        if (this.chat.isOpen.value) {
            this.activeLink = 'MESSAGES';
        } else if (this.router.url.includes('/coffee-lab')) {
            this.activeLink = 'COFFEELAB';
        } else if (this.router.url.includes('/roastery-profile') || this.router.url.includes('/my-profile')) {
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
        this.userService.getOrgDetail().subscribe((res: any) => {
            if (res.result) {
                this.orgTermsAccepted = res.result.terms_accepted || !('terms_accepted' in res.result);
                this.authService.organizationSubject.next(res.result);
                resolve();
            } else {
                this.router.navigate(['/gate']);
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

    getOrganizations() {
        this.idmService.verifyToken().subscribe((res: any) => {
            if (res.success === true) {
                console.log('Organizations:', res.result);
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
