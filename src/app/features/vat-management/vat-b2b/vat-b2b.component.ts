import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoasteryProfileService } from '../../roastery-profile/roastery-profile.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-vat-b2b',
    templateUrl: './vat-b2b.component.html',
    styleUrls: ['./vat-b2b.component.scss'],
})
export class VatB2bComponent implements OnInit {
    // tslint:disable: indent
    // tslint:disable: variable-name
    country: any = '';
    transaction_type: any;
    vat_percentage: any;
    mraddtranscation = false;
    mradd = true;
    editTableRow = false;
    updateVatmode = false;
    addEcommerce = [];

    roasterId: any;
    showpostdiv = true;
    resetButtonValue = 'Save';
    eachId: any;
    b2bEcommerceList: any;
    editB2Bmode = true;
    saveB2Bmode = false;

    editIndex = null;
    transaction: FormGroup;

    @Input() mobile = false;

    constructor(
        private router: Router,
        private toastrService: ToastrService,
        public cookieService: CookieService,
        public roasteryProfileService: RoasteryProfileService,
        public userService: UserserviceService,
        private fb: FormBuilder,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.getB2bDetails();
        this.transaction = this.fb.group({
            country: ['', Validators.compose([Validators.required])],
            transaction_type: [null, Validators.compose([Validators.required])],
            vat_percentage: [null, Validators.compose([Validators.required])],
            vat_type: ['b2b_ecommerce'],
        });
    }
    getB2bDetails() {
        this.userService.getRoasterVatDetails(this.roasterId, 'b2b_ecommerce').subscribe((result) => {
            this.b2bEcommerceList = result.result;
        });
    }
    public addNewB2bTranscation() {
        if (this.mobile) {
            if (!this.editIndex) {
                this.editIndex = this.b2bEcommerceList.length;
                this.b2bEcommerceList.push({
                    country: '',
                    transaction_type: '',
                    vat_percentage: '',
                });
                this.transaction = this.fb.group({
                    country: ['', Validators.compose([Validators.required])],
                    transaction_type: [null, Validators.compose([Validators.required])],
                    vat_percentage: [null, Validators.compose([Validators.required])],
                    vat_type: ['b2b_ecommerce'],
                });
            } else {
                this.toastrService.error('Please save the unsaved changes.');
            }
        } else {
            this.addEcommerce.push({
                country: '',
                transaction_type: '',
                vat_percentage: '',
            });
            this.editB2Bmode = true;
            this.saveB2Bmode = true;
        }
    }
    private validateInput(data) {
        let flag = true;
        if (data && data.length) {
            data.forEach((ele) => {
                if (ele.country === '' || ele.transaction_type === '' || ele.vat_percentage === '') {
                    flag = false;
                }
            });
        }
        return flag;
    }
    public deleteB2BRow(index) {
        if (this.mobile) {
            this.b2bEcommerceList.splice(index, 1);
            this.editIndex = null;
        } else {
            this.addEcommerce.splice(index, 1);
        }
    }
    cancelItem(item, index) {
        if (item.id) {
            this.editIndex = null;
        } else {
            this.deleteB2BRow(index);
        }
    }

    getCountryName(code: any) {
        const country = this.roasteryProfileService.countryList.find((con) => con.isoCode === code);
        return country ? country.name : '';
    }
    changeCountry() {
        this.roasteryProfileService.changeCountry(this.roasteryProfileService.country);
    }
    saveB2BVat() {
        let flag = true;
        const input = this.addEcommerce;
        flag = this.validateInput(input);
        if (flag) {
            this.resetButtonValue = 'Saving';
            this.addEcommerce.forEach((element) => {
                const body = {
                    country: element.country,
                    transaction_type: element.transaction_type,
                    vat_percentage: element.vat_percentage,
                    vat_type: 'b2b_ecommerce',
                };
                this.addNewVatItem(body);
            });
        } else {
            this.resetButtonValue = 'Save';
            this.toastrService.error('Fields should not be empty.');
        }
    }
    addNewVatItem(body) {
        this.userService.addVatDetails(this.roasterId, body).subscribe((result) => {
            if (result.success) {
                this.resetButtonValue = 'Save';
                this.toastrService.success('B2B VAT Details added successfully');
                this.getB2bDetails();
                this.editIndex = null;
                this.addEcommerce = [];

                this.editB2Bmode = true;
                this.saveB2Bmode = false;
            } else {
                this.toastrService.error('Error while adding VAT details');
                this.resetButtonValue = 'Save';
            }
        });
    }
    updateEachB2bVat(vatItem: any, index = null) {
        if (this.mobile) {
            if (this.editIndex === null) {
                this.editIndex = index;
                this.transaction = this.fb.group({
                    country: [vatItem.country.toUpperCase(), Validators.compose([Validators.required])],
                    transaction_type: [vatItem.transaction_type, Validators.compose([Validators.required])],
                    vat_percentage: [vatItem.vat_percentage, Validators.compose([Validators.required])],
                    vat_type: ['b2b_ecommerce'],
                });
            } else {
                this.toastrService.error('Please save the unsaved changes.');
            }
        } else {
            this.updateVatmode = false;
            this.editTableRow = true;
            vatItem.country = vatItem.country.toUpperCase();
        }
        this.eachId = vatItem.id;
    }

    saveEachB2bVat(vatId: any, data, tab = false) {
        let updateData = {
            country: data.country,
            transaction_type: data.transaction_type,
            vat_percentage: data.vat_percentage,
            vat_type: 'b2b_ecommerce',
        };
        if (this.mobile) {
            if (vatId) {
                updateData = tab ? updateData : data;
            } else {
                updateData = tab ? updateData : data;
                this.addNewVatItem(updateData);
                return;
            }
        }
        this.userService.updateMrVat(this.roasterId, updateData, vatId).subscribe((result) => {
            if (result.success) {
                this.toastrService.success('B2B VAT Details updated successfully');
                this.getB2bDetails();
                this.editIndex = null;
                this.updateVatmode = true;
                this.editTableRow = false;
            } else {
                this.toastrService.error('Error while adding VAT details');
            }
        });
    }
    deleteEachB2bVat(deleteId: any) {
        this.userService.deleteMrVat(this.roasterId, deleteId).subscribe((result) => {
            if (result.success) {
                this.toastrService.success('B2B VAT deleted successfully');
                setTimeout(() => {
                    this.getB2bDetails();
                }, 1000);
                this.editIndex = null;
                this.editB2Bmode = true;
            } else {
                this.toastrService.error('Error while deleting VAT details');
            }
        });
    }
    get detailsFormControl() {
        return this.transaction.controls;
    }
}
