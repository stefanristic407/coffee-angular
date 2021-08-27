import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InviteFriendsService } from '@services';
import { ValidateEmail, ValidateEmailService } from '@app/shared/services/email-validator.service';

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
        private inviteFriendsService: InviteFriendsService,
        private validateService: ValidateEmailService
    ) {}

    ngOnInit(): void {
        this.infoForm = this.fb.group({
            emails: this.fb.array([
                this.fb.control(
                    '',
                    Validators.compose([Validators.required]),
                    ValidateEmail.createValidator(this.validateService),
                ),
            ]),
        });
    }

    addEmail() {
        this.emails.push(
            this.fb.control(
                '',
                Validators.compose([Validators.required]),
                ValidateEmail.createValidator(this.validateService),
            ),
        );
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
                    email: element,
                };
                promises.push(
                    new Promise((resolve, reject) => {
                        return this.inviteFriendsService.inviteFriend(postData).subscribe((res: any) => {
                            if (res.success) {
                                resolve(res);
                            } else {
                                reject();
                            }
                        });
                    }),
                );
            });
            Promise.all(promises)
                .then((res: any) => {
                    this.inviting = false;
                    this.toastrService.success('Invitation has been sent successfully');
                })
                .catch(() => {
                    // this.toastrService.error('Error while inviting friends');
                });
        } else {
            this.toastrService.error('Please fill correct data.');
        }
    }
}
