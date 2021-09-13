import { Component, ElementRef, OnInit, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { SharedServiceService } from '@app/shared/services/shared-service.service';
import {
    AuthService,
    CommonService,
    GlobalsService,
    ResizeService,
    RoasterserviceService,
    UserService,
} from '@services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { ChatHandlerService } from '@services';
import { OrganizationType, UserStatus } from '@enums';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@shared';
import { UserManagementSearchService } from '../user-management-service';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ResizeableComponent } from '@base-components';

@Component({
    selector: 'app-team-member-table',
    templateUrl: './team-member-table.component.html',
    styleUrls: ['./team-member-table.component.scss'],
})
export class TeamMemberTableComponent extends ResizeableComponent implements OnInit, AfterViewInit {
    readonly UserStatus = UserStatus;
    roasterID: any;
    breadCrumbItem: MenuItem[] = [];
    termStatus;
    termRole;
    termRoleName;
    termSearch = '';
    tableColumns: any = [];
    tableValue: any = [];
    tableSelected: any = [];
    totalCount = 0;
    currentRoleID;
    roleList: any = [];
    selectedUsers: any = [];
    roasterUsers: any = [];
    isAddMember = false;
    modalRef: BsModalRef;
    modalUserRoasterId = '';
    modalUserRoasterName = '';
    loginId: any;
    tableRows;
    popupDetails = { message: '', buttonName: '', showIcon: false };
    assignedUsers = [];
    @ViewChild('input') input: ElementRef;
    constructor(
        public router: Router,
        private roasterService: RoasterserviceService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        public route: ActivatedRoute,
        public userService: UserService,
        private modalService: BsModalService,
        private messageService: ChatHandlerService,
        public sharedService: SharedServiceService,
        public dialogSrv: DialogService,
        private commonService: CommonService,
        private authService: AuthService,
        protected resizeService: ResizeService,
        private userManagementSearchService: UserManagementSearchService,
        public location: Location,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.allFunction();
        this.sharedService.windowWidth = window.innerWidth;
        if (this.sharedService.windowWidth <= this.sharedService.responsiveStartsAt) {
            this.sharedService.isMobileView = true;
        }
        this.tableRows = 10;
        this.loginId = this.authService.userId;
        this.roasterID = this.authService.getOrgId();
        this.route.queryParams.subscribe((params) => {
            this.currentRoleID = Number(params.roleID);
            this.isAddMember = params.isAddMember && params.isAddMember === 'true' ? true : false;
            this.assignedUsers = [];
            if (this.route.snapshot.routeConfig.path === 'pending-invitations') {
                this.tableColumns = [
                    {
                        field: 'name',
                        header: 'Name',
                        sortable: false,
                    },
                    {
                        field: 'created_at',
                        header: 'Sent on',
                        sortable: true,
                    },
                    {
                        field: 'email',
                        header: 'Email',
                    },
                    {
                        field: 'role',
                        header: 'Role',
                        sortable: false,
                    },
                    {
                        field: 'actions',
                        header: 'Actions',
                        sortable: false,
                    },
                ];
            } else {
                this.tableColumns = [
                    {
                        field: 'name',
                        header: 'Name',
                        sortable: false,
                        width: '150px',
                    },
                    {
                        field: 'last_login_at',
                        header: 'Last login',
                        sortable: false,
                        width: '15%',
                    },
                    {
                        field: 'email',
                        header: 'Email',
                        width: '25%',
                    },
                    {
                        field: 'status',
                        header: 'Status',
                        sortable: false,
                        width: '15%',
                    },
                    {
                        field: 'roles',
                        header: '',
                        sortable: false,
                        width: '20%',
                    },
                ];
                if (!this.isAddMember) {
                    this.tableColumns.push({
                        field: 'actions',
                        header: 'Actions',
                        sortable: false,
                        width: 10,
                    });
                }
            }
            this.listRoles();
        });
    }

    allFunction() {
        this.userManagementSearchService.clearSearch();
        this.userManagementSearchService.search$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((search: any) => {
            this.termSearch = search;
            this.getTableData();
        });

        this.userManagementSearchService.role$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((role: any) => {
            this.termRole = role;
            this.filterCall();
        });

        this.userManagementSearchService.allrole$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((allrole: any) => {
            this.currentRoleID = allrole;
            this.filterSelectedRoleUser();
        });

        this.userManagementSearchService.status$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((status: any) => {
            this.termStatus = status;
            this.filterCall();
        });
    }
    listRoles(): void {
        this.roasterService.getRoles().subscribe(
            (response: any) => {
                if (response.success) {
                    const getCurrentRole: any = response.result.find((ele) => ele.id === this.currentRoleID);
                    if (!this.isAddMember) {
                        this.termRole = this.currentRoleID;
                        this.termRoleName = getCurrentRole ? getCurrentRole.name : '';
                    }
                }
                this.roleList = response.result;
                this.getTableData();
            },
            (err) => {
                this.getTableData();
                console.error(err);
            },
        );
    }
    getTableData(event?): void {
        if (this.route.snapshot.routeConfig.path === 'pending-invitations') {
            const params = { name: this.termSearch };
            this.roasterService.getInvitedUserLists(this.roasterID, params).subscribe((res: any) => {
                this.tableValue = res?.result.map((element) => {
                    element.name = element.firstname + ' ' + element.lastname;
                    return element;
                });
            });
        } else {
            this.selectedUsers = [];
            this.roasterUsers = [];
            this.tableValue = [];
            const postData: any = {};
            postData.role_id = this.termRole ? this.termRole : '';
            postData.name = this.termSearch ? this.termSearch : '';
            postData.per_page = 10;
            if (event) {
                const currentPage = event.first / this.tableRows;
                postData.page = currentPage + 1;
            }
            postData.status = this.termStatus ? this.termStatus : undefined;
            this.roasterService.getRoasterUsers(this.roasterID, postData).subscribe(
                (result: any) => {
                    if (result.success) {
                        const userData = result.result;
                        if (userData && userData.length > 0) {
                            this.totalCount = result.result_info.total_count;
                            this.roasterUsers = [];
                            userData.forEach((element, index) => {
                                const tempData: any = {};
                                tempData.id = element.id;
                                tempData.name = element.firstname + ' ' + element.lastname;
                                tempData.email = element.email;
                                tempData.status = element.status;
                                tempData.last_login_at = element.last_login_at;
                                const roleList = [];
                                if (element.roles) {
                                    const rolesName = element.roles.split(',');
                                    let roleLable = '';
                                    rolesName.forEach((ele, roleIndex) => {
                                        const getRoles = this.roleList.find((item) => item.name === ele);
                                        if (getRoles) {
                                            roleList.push(getRoles);
                                        }
                                        if (roleIndex < 2) {
                                            roleLable = roleLable + ele;
                                            if (roleIndex !== rolesName.length - 1) {
                                                roleLable = roleLable + ', ';
                                            }
                                        }
                                        if (roleIndex === 2) {
                                            roleLable = roleLable + '+2';
                                        }
                                    });
                                    tempData.roleLable = roleLable;
                                }
                                tempData.roles = roleList;
                                this.roasterUsers.push(tempData);
                            });
                        }
                        if (this.isAddMember) {
                            this.filterSelectedRoleUser();
                        }
                        this.tableValue = this.roasterUsers;
                    }
                },
                (err) => {
                    console.error(err);
                },
            );
        }
    }
    filterSelectedRoleUser(): void {
        this.assignedUsers = [];
        this.roasterUsers.forEach((ele) => {
            const findCurrentRoleID = ele.roles ? ele.roles.find((item) => item.id === this.currentRoleID) : undefined;
            if (findCurrentRoleID) {
                this.assignedUsers.push(ele.id);
            }
        });
    }

    assignUsersToRole(): void {
        let count = 0;
        this.selectedUsers.forEach((ele) => {
            this.roasterService.assignUserBasedUserRoles(this.roasterID, this.currentRoleID, ele.id).subscribe(
                (res: any) => {
                    count++;
                    if (res.success) {
                        if (count === this.selectedUsers.length) {
                            this.toastrService.success('Role Assigned Successfully!');
                            this.getTableData();
                        }
                    } else {
                        this.toastrService.error('User Role Already exists.Please select another role');
                    }
                },
                (err) => {
                    count++;
                    console.error(err);
                },
            );
        });
    }
    // Function Name : Edit Member
    // Description: This function helps to redirect to edit member page with user id as route params
    editMember(size: any) {
        if (!this.isAddMember) {
            const userID = size;
            const navigationExtras: NavigationExtras = {
                queryParams: {
                    userID: encodeURIComponent(userID),
                },
            };

            this.router.navigate(['/team-management/edit-members'], navigationExtras);
        }
    }
    // Function Name : Open Modal
    // Description: This function helps to get the Role Id from user management page
    openModal(template: TemplateRef<any>, userId: any, userName: any) {
        this.modalRef = this.modalService.show(template);
        this.modalUserRoasterId = userId;
        this.modalUserRoasterName = userName;
    }
    // Function Name : user Disable
    // Description: This function helps to disable the selected user.
    userDisable(disableId) {
        this.roasterService.disableAdminUsers(this.roasterID, disableId).subscribe((result: any) => {
            if (result.success) {
                this.toastrService.success('Disabled User Account Successfully');
                this.getTableData();
            } else {
                this.toastrService.error('Error while disabling the User account');
            }
        });
    }
    userEnable(enableId) {
        this.roasterService.enableAdminUser(this.roasterID, enableId).subscribe((result: any) => {
            if (result.success) {
                this.toastrService.success('Enabled User Account');
                this.getTableData();
            } else {
                this.toastrService.error('Error while enabling the User account');
            }
        });
    }
    makeAdmin(userDetails: any) {
        let findAdmin = false;
        if (userDetails && userDetails.roles && userDetails.roles.length > 0) {
            findAdmin = userDetails.roles.find((ele) => ele.name === 'Support Admin');
            if (findAdmin) {
                this.toastrService.error('Already an Admin.');
            } else {
                const findAdminRole = this.roleList.find((ele) => ele.name === 'Support Admin');
                this.roasterService
                    .assignUserBasedUserRoles(this.roasterID, findAdminRole.id, userDetails.id)
                    .subscribe((data: any) => {
                        if (data.success) {
                            this.toastrService.success('User has been made Admin Successfully!');
                            this.getTableData();
                        }
                    });
            }
        }
    }
    showPopup(userID, flag) {
        // this.popupDisplay = true;
        if (flag === 'delete') {
            this.popupDetails.message = 'You sure you really want to delete this?';
            this.popupDetails.buttonName = 'Delete';
            this.popupDetails.showIcon = true;
        } else if (flag === 'enable') {
            this.popupDetails.message = 'Are you sure you want to enable the account?';
            this.popupDetails.buttonName = 'Enable';
            this.popupDetails.showIcon = false;
        } else {
            this.popupDetails.message = 'Are you sure you want to disable the account?';
            this.popupDetails.buttonName = 'Disable';
            this.popupDetails.showIcon = false;
        }
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: flag === 'delete' ? 'Oh noh :(' : 'Are you sure?',
                    desp: this.popupDetails.message,
                    type: flag === 'delete' ? 'delete' : 'confirm',
                    noButton: this.globals.languageJson?.cancel,
                    yesButton: this.popupDetails.buttonName,
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    if (this.popupDetails.buttonName === 'Delete') {
                        this.deleteRoasterUser(userID);
                    } else if (this.popupDetails.buttonName === 'Enable') {
                        this.userEnable(userID);
                    } else {
                        this.userDisable(userID);
                    }
                }
            });
    }

    sendDirectMessage(userID) {
        const payLoad = {
            user_id: userID,
            org_type: OrganizationType.ROASTER,
            org_id: Number(this.roasterID),
        };
        this.messageService.openChatThread(payLoad);
    }
    deleteRoasterUser(userID: any) {
        this.roasterService.deleteRoasterUser(this.roasterID, userID).subscribe((response: any) => {
            if (response.success) {
                this.toastrService.success('User Deleted successfully!');
                this.getTableData();
            } else {
                this.toastrService.error('Unable to delete the user.');
            }
        });
    }
    filterCall() {
        if (this.termRole) {
            const getRole = this.roleList.find((ele) => ele.id === this.termRole);
            this.termRoleName = getRole && getRole.name ? getRole.name : '';
        }
        this.getTableData();
    }
    ngAfterViewInit() {
        // server-side search
        fromEvent(this.input.nativeElement, 'keyup')
            .pipe(
                filter(Boolean),
                debounceTime(400),
                distinctUntilChanged(),
                tap((text) => {
                    this.getTableData();
                }),
            )
            .subscribe();
    }

    selectRows(checkValue) {
        this.selectedUsers = [];
        if (checkValue) {
            this.roasterUsers.forEach((ele) => {
                const findCurrentRoleID = ele.roles
                    ? ele.roles.find((item) => item.id === this.currentRoleID)
                    : undefined;
                if (!findCurrentRoleID) {
                    this.selectedUsers.push(ele);
                }
            });
        } else {
            this.selectedUsers = [];
        }
    }

    selectRow(userRoles) {
        const findCurrentRoleID = userRoles ? userRoles.find((item) => item.id === this.currentRoleID) : undefined;
        if (findCurrentRoleID) {
            this.toastrService.error('This user has been already assigned.');
        }
    }

    sendMail(userID: any) {
        this.roasterService.sendRecoveryEmail(userID).subscribe(
            (res: any) => {
                if (res.success) {
                    this.toastrService.success('Email has been sent successfully');
                } else {
                    this.toastrService.error('Error while sending email to the User');
                }
            },
            (err) => {
                this.toastrService.error('Error while sending email to the User');
            },
        );
    }

    simulatedLogin(userId) {
        this.commonService.userSimulatedLogin(userId);
    }
}
