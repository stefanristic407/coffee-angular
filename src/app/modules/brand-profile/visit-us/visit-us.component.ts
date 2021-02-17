import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { maxWordCountValidator, fileCountValidator } from '@services';
import { FormService } from '@services';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { UserserviceService } from '@services';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';
@Component({
    selector: 'app-visit-us',
    templateUrl: './visit-us.component.html',
    styleUrls: ['./visit-us.component.scss'],
})
export class VisitUsComponent implements OnInit {
    roasterId: string;
    roasterSlug: string;
    breadItems: any[];
    infoForm: FormGroup;
    cities: any[] = [];
    SearchCountryField = SearchCountryField;
    TooltipLabel = TooltipLabel;
    CountryISO = CountryISO;
    PhoneNumberFormat = PhoneNumberFormat;
    preferredCountries: CountryISO[] = [CountryISO.Sweden, CountryISO.India];

    country: string = '';
    state: string = '';
    address1: string = '';
    address2: string = '';
    city: string = '';
    zip_code: string = '';
    email: string = '';
    phoneNumber: string = '';
    banner_id: any;
    banner_image_name: string = '';
    savedFaqArray: any[] = [];
    questionArray = [];
    public addanotherrow: number;
    questionTypeError: string;
    questionAnswerError: string;
    questionError: string;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private formSrv: FormService,
        public globals: GlobalsService,
        private toastrService: ToastrService,
        private cookieService: CookieService,
        private userService: UserserviceService,
        private roasterService: RoasterserviceService,
        public roasterProfileService: RoasteryProfileService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.roasterSlug = this.cookieService.get('roasterSlug');
        this.questionArray.push({
            id: 1,
            question: '',
            answer: '',
            type: '',
        });
        this.questionTypeError = '';
        this.questionError = '';
        this.questionAnswerError = '';
    }
    ngOnInit(): void {
        this.breadItems = [
            { label: this.globals.languageJson?.home, routerLink: '/features/welcome-aboard' },
            { label: this.globals.languageJson?.brand_profile, routerLink: '/brand-profile' },
            { label: 'Visit us' },
        ];
        this.infoForm = this.fb.group({
            banner_file: [null, Validators.compose([Validators.required])],
            banner_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            country: ['', Validators.compose([Validators.required])],
            state: ['', Validators.compose([Validators.required])],
            address1: ['', Validators.compose([Validators.required])],
            address2: [''],
            city: ['', Validators.compose([Validators.required])],
            zip_code: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            phone: ['', Validators.compose([Validators.required])],
        });
        this.getVisitDetails();
        this.getFAQList();
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.savedFaqArray, event.previousIndex, event.currentIndex);
    }

    //Description: This function helps for saving question.
    saveQuestion(rowcount, event) {
        for (let j = 0; j < this.questionArray.length; j++) {
            if (this.questionArray[j].question == '' && this.questionArray[j].answer == '') {
                $('.myAlert-top').show();
                this.questionTypeError = 'Please Fill the mandatory Fields';
                this.questionAnswerError = 'Please Fill the mandatory Fields';
                this.questionError = 'Please Fill the mandatory Fields';
                document.getElementById('question_answer').style.border = '1px solid #d50000';
                document.getElementById('question').style.border = '1px solid #d50000';
                // document.getElementById("certification_year").style.border =
                // "1px solid #d50000";
                document.getElementById('question_type').style.border = '1px solid #d50000';
                setTimeout(() => {
                    this.questionTypeError = '';
                    this.questionAnswerError = '';
                    this.questionError = '';
                }, 3000);
            }
            // else if (
            //   this.questionArray[j].type == "" ||
            //   this.questionArray[j].type == null ||
            //   this.questionArray[j].type == undefined
            // ) {
            //   $(".myAlert-top").show();
            //   this.questionTypeError = "Please enter type";
            //   document.getElementById("question_type").style.border =
            //     "1px solid #d50000";
            //   setTimeout(() => {
            //     this.questionTypeError = "";
            //   }, 3000);
            // }
            else if (
                this.questionArray[j].answer == '' ||
                this.questionArray[j].answer == null ||
                this.questionArray[j].answer == undefined
            ) {
                $('.myAlert-top').show();
                this.questionAnswerError = 'Please enter Answer';
                document.getElementById('question_answer').style.border = '1px solid #d50000';
                setTimeout(() => {
                    this.questionAnswerError = '';
                }, 3000);
            } else if (
                this.questionArray[j].question == '' ||
                this.questionArray[j].question == null ||
                this.questionArray[j].question == undefined
            ) {
                $('.myAlert-top').show();
                this.questionError = 'Please enter question';
                document.getElementById('question').style.border = '1px solid #d50000';
                setTimeout(() => {
                    this.questionError = '';
                }, 3000);
            } else {
                const payload = {
                    question: this.questionArray[j].question,
                    faq_type: 'DISPUTE',
                    answer: this.questionArray[j].answer,
                    status: 'ENABLED',
                };
                this.userService.addFAQ(this.roasterId, payload).subscribe(
                    (data) => {
                        // console.log(data)
                        this.savedFaqArray.push({
                            id: this.questionArray[j].id,
                            question: this.questionArray[j].question,
                            type: this.questionArray[j].type,
                            answer: this.questionArray[j].answer,
                        });
                        this.questionArray = [];
                        this.getFAQList();
                        this.toastrService.success('FAQ added successfully');
                    },
                    (err) => {
                        this.toastrService.error('Error while adding');
                    },
                );
            }
        }
        if (this.questionArray.length == 0) {
            this.questionArray.push({
                id: 1,
                question: '',
                answer: '',
                type: '',
            });
        }
    }

    savePageData() {
        console.log(this.infoForm.value);
        return;
        if (this.infoForm.valid) {
            const postData = {
                ...this.infoForm.value,
                banner_file: this.infoForm.value.banner_file.id,
            };
            this.userService.updateHomeDetails(this.roasterId, postData, 'visit-us').subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('Visit page Details updated successfully');
                    this.router.navigate(['/brand-profile']);
                } else {
                    this.toastrService.error('Error while updating details');
                }
            });
        } else {
            this.formSrv.markGroupDirty(this.infoForm);
        }
    }

    changeCountry() {
        if (this.infoForm.value.country) {
            this.globals.getCountry(this.infoForm.value.country).cities.forEach((element) => {
                this.cities.push({ label: element, value: element });
            });
        }
    }

    getVisitDetails() {
        this.userService.getPageDetails(this.roasterId, 'visit-us').subscribe(async (res: any) => {
            if (res.success) {
                console.log('Visit:', res.result);
                this.infoForm.patchValue(res.result);
                this.changeCountry();
                if (res.result.banner_file) {
                    this.infoForm.controls.banner_file.setValue({
                        id: res.result.banner_file,
                        url: res.result.banner_file_url,
                    });
                }
            }
        });
    }

    addnewrow() {
        if (this.questionArray.length == 1) {
            return;
        }
        var newrowc = this.addanotherrow + 1;
        this.addanotherrow = newrowc;
        this.questionArray.push({
            question: '',
            answer: '',
            type: '',
            id: 1,
        });
        //this.licenseArray.push(this.licenseArray.length);
    }

    getFAQList() {
        this.userService.getFAQList(this.roasterId).subscribe((data) => {
            this.savedFaqArray = data['result'];
        });
    }

    deleteFAQ(faq) {
        if (confirm('Please confirm! you want to delete?') == true) {
            this.userService.deleteFAQ(this.roasterId, faq.id).subscribe((response) => {
                if (response['success'] == true) {
                    this.toastrService.success('The selected FAQ has been deleted successfully');
                    this.getFAQList();
                } else {
                    this.toastrService.error('Something went wrong while deleting the FAQ');
                }
            });
        }
    }

    editFAQ(faq) {}
}
