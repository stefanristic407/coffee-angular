// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of user login.

import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    userEmail: string;
    userPassword: string;
    loginEmailError: any;
    loginPasswordError: any;
    loginButtonValue: any;
    roaster_id: any;
    value: string;
    permissionList: any;
    slugList: any;
    accesslist: any;
    permissionSlugData: any = [];
    accessData: any = [];
    constructor(
        private router: Router,
        private userService: UserserviceService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
    ) {}

    ngOnInit(): void {
        this.loginEmailError = '';
        this.loginPasswordError = '';
        this.loginButtonValue = 'Login';
        $('input#pwd').on('focus keyup', function () {});

        $('input#pwd').blur(function () {});
        $('input#pwd').on('focus keyup', function () {
            var score = 0;
            var a = $(this).val();
            var desc = new Array();

            // strength desc
            desc[0] = 'Too short';
            desc[1] = 'Weak';
            desc[2] = 'Good';
            desc[3] = 'Strong';
            desc[4] = 'Best';
        });

        $('input#pwd').blur(function () {});
        $('input#pwd').on('focus keyup', function () {
            var score = 0;
            var a = $(this).val();
            var desc = new Array();

            // strength desc
            desc[0] = 'Too short';
            desc[1] = 'Weak';
            desc[2] = 'Good';
            desc[3] = 'Strong';
            desc[4] = 'Best';

            // password length
            if (a.length >= 6) {
                $('#length').removeClass('invalid').addClass('valid');
                score++;
            } else {
                $('#length').removeClass('valid').addClass('invalid');
            }

            // at least 1 digit in password
            if (a.match(/\d/)) {
                $('#pnum').removeClass('invalid').addClass('valid');
                score++;
            } else {
                $('#pnum').removeClass('valid').addClass('invalid');
            }

            // at least 1 capital & lower letter in password
            if (a.match(/[A-Z]/) && a.match(/[a-z]/)) {
                $('#capital').removeClass('invalid').addClass('valid');
                score++;
            } else {
                $('#capital').removeClass('valid').addClass('invalid');
            }

            // at least 1 special character in password {
            if (a.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) {
                $('#spchar').removeClass('invalid').addClass('valid');
                score++;
            } else {
                $('#spchar').removeClass('valid').addClass('invalid');
            }

            if (a.length > 0) {
                //show strength text
                $('#passwordDescription').text(desc[score]);
                // show indicator
                $('#passwordStrength')
                    .removeClass()
                    .addClass('strength' + score);
            } else {
                $('#passwordDescription').text('Password not entered');
                $('#passwordStrength')
                    .removeClass()
                    .addClass('strength' + score);
            }
        });

        $('input#pwd').blur(function () {});

        $('input#pwd').blur(function () {
            $('#pwd_strength_wrap').fadeOut(400);
        });
    }

    // Function Name : Validation Alert function
    // Description: This function helps to show the Alert box, when the login is invalid.

    myAlertTop() {
        $('.myAlert-top').show();
        $('.myAlert-permission').hide();
        $('.myAlert-status').hide();
    }

    // Function Name : Permission Alert function
    // Description: This function helps to show the Alert box, when the Permission is invalid.

    myAlertPermission() {
        $('.myAlert-top').hide();
        $('.myAlert-status').hide();
        $('.myAlert-permission').show();
    }

    // Function Name : Status Alert function
    // Description: This function helps to show the Alert box, when the Status is invalid.

    myAlertStatus() {
        $('.myAlert-top').hide();
        $('.myAlert-permission').hide();
        $('.myAlert-status').show();
    }

    // Function Name : Login
    // Description: This function helps to get Login details from the user.

    Login() {
        var regex_email = /^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
        var pwdFormat = /^([a-zA-Z0-9@!#$%^&+=*.\-_]){5,14}$/;

        if (this.userEmail == '' || this.userEmail == null || this.userEmail == undefined) {
            this.loginEmailError = 'Please enter email address';
            document.getElementById('email').style.border = '1px solid #D50000 ';
            setTimeout(() => {
                this.loginEmailError = '';
            }, 3000);
        } else if (!regex_email.test(this.userEmail)) {
            this.loginEmailError = 'Please enter valid email id';
            document.getElementById('email').style.border = '1px solid #D50000 ';
            setTimeout(() => {
                this.loginEmailError = '';
            }, 3000);
        } else if (this.userPassword == '' || this.userPassword == null || this.userPassword == undefined) {
            this.loginPasswordError = 'Please enter password';
            document.getElementById('pwd').style.border = '1px solid #D50000 ';
            setTimeout(() => {
                this.loginPasswordError = '';
            }, 3000);
        } else if (!pwdFormat.test(this.userPassword)) {
            this.loginPasswordError = 'Password should be between 8 to 15 characters';
            document.getElementById('pwd').style.border = '1px solid #D50000 ';
            setTimeout(() => {
                this.loginPasswordError = '';
            }, 3000);
        } else {
            //this.myAlertTop();
            // if(this.userEmail =="satyanarayana.murthy@nordsud.se" && this.userPassword == "Temp@123"){
            //   this.router.navigate(["/auth/update-password"]);
            // }
            // else if(this.userEmail == "satyanarayana.murthy@nordsud.se" && this.userPassword == "Live@123"){
            //   this.router.navigate(["../../features/welcome-aboard"]);
            this.loginButtonValue = 'Logging in';
            var data = [];
            data['email'] = this.userEmail;
            data['password'] = this.userPassword;
            this.userService.roasterLogin(data).subscribe(
                (data: any) => {
                    if (data == null) {
                        this.toastrService.error('Something Went Wrong, Please Try Again');
                        this.loginButtonValue = 'Login';
                        return;
                        // this.toastrService.error("invalid Credentials ");
                    } else if (data['success'] == true) {
                        // this.loginButtonValue = "Login";
                        this.loginButtonValue = 'Logging in';
                        this.cookieService.set('user_id', data['result'].user_id);
                        this.cookieService.set('userName', data.result.first_name + ' ' + data.result.last_name);
                        this.cookieService.set('Auth', data['Authorization']);
                        this.cookieService.set('roaster_id', data['result'].roasters.id);

                        this.userService.getUserPermissions(data['result'].roasters.id).subscribe(
                            (result) => {
                                if (result['success'] == true) {
                                    this.permissionList = result['result'];
                                    // var slugData = result['result'];
                                    // slugData.forEach(element => {
                                    //   var tempList = {};
                                    //   tempList['slugList'] = element.slug;
                                    //   tempList['accessList'] = element.access_type;
                                    //   this.permissionSlugData.push(tempList);
                                    // for (var i = 0; i < this.permissionList.length; i++) {
                                    // 	this.slugList= this.permissionList[i];
                                    // 	this.accesslist=this.permissionList[i]['access_type'];
                                    // 	this.permissionSlugData.push(this.slugList);
                                    // 	this.accessData.push(this.accesslist);
                                    // }
                                    // this.cookieService.set('permissionSlug', this.permissionSlugData);
                                    // this.cookieService.set('permissionAccess',this.accessData);
                                    // });
                                    this.cookieService.set('permissionSlug', JSON.stringify(this.permissionList));
                                }
                            },
                            (err) => {
                                this.loginButtonValue = 'Login';
                            },
                        );
                        //this.toastrService.success("Logged in Successfully");
                        //        this.router.navigate(["/features/welcome-aboard"]);
                        this.userService.getRoasterAccount(data['result'].roasters.id).subscribe(
                            (result) => {
                                if (result['success'] == true) {
                                    this.loginButtonValue = 'Logging in';
                                    this.cookieService.set('name', result['result'].name);
                                    this.cookieService.set('roasterSlug', result['result'].slug);
                                    if (result['result'].status == 'ACTIVE') {
                                        this.userService
                                            .getRoasterProfile(data['result'].roasters.id)
                                            .subscribe((res) => {
                                                if (res['success'] == false) {
                                                    this.loginButtonValue = 'Login';
                                                    this.myAlertPermission();
                                                } else {
                                                    this.cookieService.set(
                                                        'referral_code',
                                                        res['result'].referral_code,
                                                    );
                                                    this.userService.getPrivacyTerms().subscribe((response) => {
                                                        if (response['result'].access_account == false) {
                                                            this.value = 'login';
                                                            let navigationExtras: NavigationExtras = {
                                                                queryParams: {
                                                                    data: encodeURIComponent(this.value),
                                                                },
                                                            };
                                                            this.router.navigate(
                                                                ['/auth/privacy-policy'],
                                                                navigationExtras,
                                                            );
                                                            this.loginButtonValue = 'Login';
                                                        } else {
                                                            this.userService
                                                                .getStats(data['result'].roasters.id)
                                                                .subscribe((userStatRes: any) => {
                                                                    if (userStatRes && userStatRes.success) {
                                                                        this.toastrService.success(
                                                                            'Logged in Successfully',
                                                                        );
                                                                        if (
                                                                            userStatRes.result.added_details &&
                                                                            userStatRes.result.added_team_members
                                                                        ) {
                                                                            if (localStorage.getItem('redirectUrl')) {
                                                                                const url = localStorage.getItem(
                                                                                    'redirectUrl',
                                                                                );
                                                                                localStorage.removeItem('redirectUrl');
                                                                                this.router.navigate([url]);
                                                                            } else {
                                                                                this.router.navigate([
                                                                                    '/features/roaster-dashboard',
                                                                                ]);
                                                                                this.loginButtonValue = 'Login';
                                                                            }
                                                                        } else {
                                                                            this.router.navigate([
                                                                                '/features/welcome-aboard',
                                                                            ]);
                                                                        }
                                                                    }
                                                                });
                                                        }
                                                    });
                                                }
                                            });
                                    } else if (result['result'].status == 'INACTIVE') {
                                        this.myAlertStatus();
                                        // this.toastrService.error("Your Account has been disabled , Contact your Admin")
                                    }
                                } else {
                                    this.toastrService.error('Something Went Wrong, Please Try Again');
                                }
                            },
                            (err) => {
                                this.loginButtonValue = 'Login';
                            },
                        );
                    } else if (data['messages'] == null) {
                        this.myAlertTop();
                        this.loginButtonValue = 'Login';
                        // this.toastrService.error("invalid Credentials ");
                    } else if (data['messages'].email[0] == 'auth_forbidden') {
                        this.myAlertPermission();
                        this.loginButtonValue = 'Login';
                        // this.toastrService.error("No permissions to Log in ");
                    } else {
                        this.toastrService.error('Something Went Wrong, Please Try Again');
                        this.loginButtonValue = 'Login';
                    }
                    // this.loginButtonValue = "Login";
                },
                (err) => {
                    this.loginButtonValue = 'Login';
                },
            );
        }
    }
    onKeyPress(event: any) {
        if (event.target.value == '') {
            document.getElementById(event.target.id).style.border = '1px solid #D50000 ';
        } else {
            document.getElementById(event.target.id).style.border = '1px solid #E8E8E8';
        }
    }
}
