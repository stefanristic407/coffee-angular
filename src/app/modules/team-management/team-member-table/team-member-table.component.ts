import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { InvitationStatus, UserStatus } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, ChatHandlerService, CommonService, ResizeService, RoasterService, UserService } from '@services';
import { ConfirmComponent } from '@shared';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { takeUntil } from 'rxjs/operators';
import { UserManagementSearchService } from '../user-management-service';

@Component({
    selector: 'app-team-member-table',
    templateUrl: './team-member-table.component.html',
    styleUrls: ['./team-member-table.component.scss'],
})
export class TeamMemberTableComponent extends ResizeableComponent implements OnInit {
    readonly UserStatus = UserStatus;
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
    loginId: any;
    tableRows = 10;
    popupDetails = { message: '', buttonName: '', showIcon: false };
    assignedUsers = [];
    loading = true;

    constructor(
        private authService: AuthService,
        private commonService: CommonService,
        private dialogSrv: DialogService,
        private messageService: ChatHandlerService,
        private roasterService: RoasterService,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
        private userManagementSearchService: UserManagementSearchService,
        private userService: UserService,
        protected resizeService: ResizeService,
        public location: Location,
        public route: ActivatedRoute,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.initFilters();
        this.loginId = this.authService.userId;
        this.route.queryParams.subscribe((params) => {
            this.currentRoleID = Number(params.roleID);
            this.isAddMember = params.isAddMember && params.isAddMember === 'true' ? true : false;
            this.assignedUsers = [];
            if (this.route.snapshot.routeConfig.path === 'pending-invitations') {
                if (this.resizeService.isMobile()) {
                    this.tableColumns = [
                        {
                            field: 'name',
                            header: 'name',
                        },
                        {
                            field: 'created_at',
                            header: 'sent_on',
                            sortable: true,
                        },
                        {
                            field: 'email',
                            header: 'email',
                        },
                        {
                            field: 'role',
                            header: 'role',
                        },
                    ];
                } else {
                    this.tableColumns = [
                        {
                            field: 'name',
                            header: 'name',
                            width: 20,
                        },
                        {
                            field: 'created_at',
                            header: 'sent_on',
                            sortable: true,
                            width: 20,
                        },
                        {
                            field: 'email',
                            header: 'email',
                            width: 20,
                        },
                        {
                            field: 'role',
                            header: 'role',
                            width: 20,
                        },
                        {
                            field: 'actions',
                            header: 'actions',
                            width: 20,
                        },
                    ];
                }
            } else {
                if (this.resizeService.isMobile()) {
                    this.tableColumns = [
                        {
                            field: 'name',
                            header: 'Name',
                        },
                        {
                            field: 'last_login_at',
                            header: 'last_login',
                        },
                        {
                            field: 'email',
                            header: 'email',
                        },
                        {
                            field: 'roles',
                            header: 'all_roles',
                        },
                    ];
                } else {
                    this.tableColumns = [
                        {
                            field: 'name',
                            header: 'name',
                            width: 15,
                        },
                        {
                            field: 'last_login_at',
                            header: 'last_login',
                            width: 15,
                        },
                        {
                            field: 'email',
                            header: 'email',
                            width: 25,
                        },
                        {
                            field: 'status',
                            header: 'status',
                            width: 15,
                        },
                        {
                            field: 'roles',
                            header: 'all_roles',
                            width: 20,
                        },
                    ];
                    if (!this.isAddMember) {
                        this.tableColumns.push({
                            field: 'actions',
                            header: 'actions',
                            width: 10,
                        });
                    }
                }
            }
            this.listRoles();
        });
    }

    initFilters() {
        this.userManagementSearchService.clearFilters();
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
        this.roasterService.getRoles().subscribe((res) => {
            if (res.success) {
                const getCurrentRole: any = res.result.find((ele) => ele.id === this.currentRoleID);
                if (!this.isAddMember) {
                    this.termRole = this.currentRoleID;
                    this.termRoleName = getCurrentRole ? getCurrentRole.name : '';
                }
            }
            this.roleList = res.result;
            this.getTableData();
        });
    }

    getTableData(event?): void {
        this.loading = true;
        if (this.route.snapshot.routeConfig.path === 'pending-invitations') {
            this.roasterService
                .getInvitedUserLists({ name: this.termSearch, status: InvitationStatus.PENDING })
                .subscribe((res) => {
                    if (res.success) {
                        this.tableValue = (res.result || []).map((element) => {
                            element.name = element.firstname + ' ' + element.lastname;
                            return element;
                        });
                    }
                    this.loading = false;
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
            this.roasterService.getOrgUsers(postData).subscribe(
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
                    this.loading = false;
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
            this.roasterService.assignUserBasedUserRoles(this.currentRoleID, ele.id).subscribe(
                (res: any) => {
                    count++;
                    if (res.success) {
                        if (count === this.selectedUsers.length) {
                            this.toastrService.success(this.translator.instant('role_assigned_successfully'));
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

    userDisable(disableId) {
        this.roasterService.disableAdminUsers(disableId).subscribe((result: any) => {
            if (result.success) {
                this.toastrService.success('Disabled User Account Successfully');
                this.getTableData();
            } else {
                this.toastrService.error('Error while disabling the User account');
            }
        });
    }

    userEnable(enableId) {
        this.roasterService.enableAdminUser(enableId).subscribe((result: any) => {
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
            findAdmin = userDetails.roles.find((ele) => ele.is_system);
            if (findAdmin) {
                this.toastrService.error('Already an Admin.');
            } else {
                const findAdminRole = this.roleList.find((ele) => ele.is_system);
                this.roasterService
                    .assignUserBasedUserRoles(findAdminRole.id, userDetails.id)
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
        if (flag === 'delete') {
            this.popupDetails.message = 'Are you sure you really want to delete this?';
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
                    noButton: this.translator.instant('cancel'),
                    yesButton: this.popupDetails.buttonName,
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    if (this.popupDetails.buttonName === 'Delete') {
                        this.deleteOrgUser(userID);
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
            org_type: this.authService.orgType,
            org_id: this.authService.getOrgId(),
        };
        this.messageService.openChatThread(payLoad);
    }

    deleteOrgUser(userID: any) {
        this.roasterService.deleteOrgUser(userID).subscribe((response: any) => {
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

    inviteTeamMember(userData) {
        const postData = {
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            role_id: userData.role_id,
        };
        this.userService.inviteTeamMember(postData).subscribe((res: any) => {
            if (res.success) {
                this.toastrService.success('Invite sent successfully');
            } else {
                this.toastrService.error('Error while sending invite');
            }
        });
    }

    simulatedLogin(userId) {
        this.commonService.userSimulatedLogin(userId);
    }

    getMenuItemsForItem(item) {
        return [
            { label: this.translator.instant('edit'), command: () => this.editMember(item.id) },
            {
                label: this.translator.instant('send_a_message'),
                command: () => this.sendDirectMessage(item.id),
                visible: item.id !== this.loginId,
            },
            { label: this.translator.instant('send_recovery_email'), command: () => this.sendMail(item.id) },
            {
                label: this.translator.instant('disable_account'),
                command: () => this.showPopup(item.id, 'disable'),
                visible: item.status === UserStatus.ACTIVE && item.id !== this.loginId,
            },
            {
                label: this.translator.instant('enable_account'),
                command: () => this.showPopup(item.id, 'enable'),
                visible: item.status === UserStatus.INACTIVE && item.id !== this.loginId,
            },
            {
                label: this.translator.instant('simulated_login'),
                command: () => this.simulatedLogin(item.id),
                visible: item.status === UserStatus.ACTIVE && item.id !== this.loginId,
            },
            {
                label: this.translator.instant('make_admin'),
                command: () => this.makeAdmin(item),
            },
            {
                label: this.translator.instant('delete'),
                command: () => this.showPopup(item.id, 'delete'),
                visible: item.id !== this.loginId,
            },
        ];
    }
}
