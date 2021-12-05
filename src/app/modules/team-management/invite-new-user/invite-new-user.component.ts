import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RoasterService, UserService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { EditUserDetailsComponent } from '../edit-user-details/edit-user-details.component';

@Component({
    selector: 'app-invite-new-user',
    templateUrl: './invite-new-user.component.html',
    styleUrls: ['./invite-new-user.component.scss'],
})
export class InviteNewUserComponent implements OnInit {
    currentRoleID: number;
    roleList: any = [];
    breadCrumbItem: MenuItem[] = [];
    @ViewChild(EditUserDetailsComponent, { static: false }) userDetails;

    constructor(
        private roasterService: RoasterService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
        private userService: UserService,
        public location: Location,
    ) {}

    ngOnInit(): void {
        this.currentRoleID = this.route.snapshot.queryParams.roleID ? +this.route.snapshot.queryParams.roleID : 0;
        this.supplyBreadCrumb();
        this.listRoles();
    }

    listRoles(): void {
        this.roasterService.getRoles().subscribe(
            (response: any) => {
                if (response.success) {
                    const getCurrentRole = response.result.find((ele) => ele.id === this.currentRoleID);
                    this.currentRoleID = getCurrentRole ? getCurrentRole.id : '';
                }
                this.roleList = response.result;
            },
            (err) => {
                console.error(err);
            },
        );
    }

    supplyBreadCrumb(): void {
        this.breadCrumbItem = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('team_management'), routerLink: '/team-management/manage-role' },
            { label: this.translator.instant('manage_roles') },
        ];
    }

    onInvite() {
        if (this.userDetails.userForm.valid) {
            if (this.currentRoleID) {
                const promises = [];
                this.userDetails.userForm.value.items.forEach((ele) => {
                    promises.push(
                        new Promise((resolve, reject) =>
                            this.inviteTeamMember(
                                {
                                    ...ele,
                                    role_id: this.currentRoleID,
                                },
                                resolve,
                                reject,
                            ),
                        ),
                    );
                });
                Promise.all(promises)
                    .then(() => {
                        this.toastrService.success('Invite sent successfully');
                        this.router.navigate(['/team-management/team-members/pending-invitations']);
                    })
                    .catch(() => {
                        this.toastrService.error('Error while sending Invite to new user');
                    });
            } else {
                this.toastrService.error(this.translator.instant('please_assign_role_to_invite'));
            }
        } else {
            this.userDetails.userForm.markAllAsTouched();
            this.toastrService.error(this.translator.instant('please_check_form_data'));
        }
    }

    inviteTeamMember(userInput, resolve, reject) {
        this.userService.inviteTeamMember(userInput).subscribe((res: any) => {
            if (res.success) {
                resolve();
            } else {
                reject();
            }
        });
    }
}
