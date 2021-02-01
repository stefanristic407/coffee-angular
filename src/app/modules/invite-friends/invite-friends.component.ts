import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { Router } from '@angular/router';
import { rejects } from 'assert';

@Component({
    selector: 'app-invite-friends',
    templateUrl: './invite-friends.component.html',
    styleUrls: ['./invite-friends.component.scss'],
})
export class InviteFriendsComponent implements OnInit {
    infoForm: FormGroup;
    inviting = true;

    get emails() {
        return this.infoForm.get('emails') as FormArray;
    }

    constructor(
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private cookieService: CookieService,
        private userService: UserserviceService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.infoForm = this.fb.group({
            emails: this.fb.array([this.fb.control('', Validators.compose([Validators.required, Validators.email]))]),
        });
    }

    addEmail() {
        this.emails.push(this.fb.control('', Validators.compose([Validators.required, Validators.email])));
    }

    deleteEmail(idx) {
        this.emails.removeAt(idx);
    }

    onSubmit() {
        if (this.infoForm.valid) {
            const promises: any[] = [];
            this.infoForm.value.emails.forEach((element) => {
                const postData = {
                    name: element,
                    portal: 'Roaster',
                    content_type: 'invite_with_url',
                    senders: [element],
                    url: 'https://qa-client-horeca.sewnstaging.com/auth/horeca-setup',
                    referral_code: this.cookieService.get('referral_code'),
                };
                promises.push(
                    new Promise((resolve, reject) => {
                        return this.userService.sendUrlToEmail(postData).subscribe((res: any) => {
                            if (res.status === '200 OK') {
                                resolve(res);
                            } else {
                                rejects(res);
                            }
                        });
                    }),
                );
            });
            Promise.all([promises])
                .then(() => {
                    this.inviting = false;
                    this.toastrService.success('Email has been sent successfully');
                })
                .catch(() => {
                    this.toastrService.error('Error while sending email to the User');
                });
        } else {
            this.toastrService.error('Please fill correct data.');
        }
    }
}
