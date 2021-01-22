import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-invite-friends',
    templateUrl: './invite-friends.component.html',
    styleUrls: ['./invite-friends.component.scss'],
})
export class InviteFriendsComponent implements OnInit {
    addUser = [
        {
            email: '',
        },
    ];
    constructor(
        private toastrService: ToastrService,
        private cookieService: CookieService,
        private userService: UserserviceService,
        private router: Router,
    ) {}

    ngOnInit(): void {}

    public addNewRow() {
        this.addUser.push({ email: '' });
    }

    public deleteRow(index) {
        this.addUser.splice(index, 1);
    }

    private validateInput(data) {
        let flag = true;
        if (data && data.length) {
            data.forEach((ele) => {
                if (ele.email === '') {
                    flag = false;
                }
            });
        }
        return flag;
    }

    public sendInvites() {
        let flag = true;
        const input = this.addUser;
        flag = this.validateInput(input);

        if (flag) {
            this.addUser.forEach((element) => {
                const postData = {
                    name: element.email,
                    portal: 'Roaster',
                    content_type: 'invite_with_url',
                    senders: [element.email],
                    url: 'https://qa-client-horeca.sewnstaging.com/auth/horeca-setup',
                    referral_code: this.cookieService.get('referral_code'),
                };
                this.userService.sendUrlToEmail(postData).subscribe((res: any) => {
                    if (res.status === '200 OK') {
                        this.router.navigate(['/people/user-management']);
                        this.toastrService.success('Email has been sent successfully');
                    } else {
                        this.toastrService.error('Error while sending email to the User');
                    }
                });
            });
        } else {
            this.toastrService.error('Fields should not be empty.');
        }
    }
}
