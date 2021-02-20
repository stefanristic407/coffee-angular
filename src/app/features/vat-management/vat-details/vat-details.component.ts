import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RoasteryProfileService } from '../../roastery-profile/roastery-profile.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-vat-details',
    templateUrl: './vat-details.component.html',
    styleUrls: ['./vat-details.component.scss'],
})
export class VatDetailsComponent implements OnInit {
    // tslint:disable: indent
    // tslint:disable: variable-name

    roasterId: any;
    resetButtonValue = 'Save';
    eachId: any;
    mrList: any;
    editIndex = null;
    transaction: FormGroup;
    @Input() mobile = false;
    @Input() feature;

    constructor(
        private toastrService: ToastrService,
        public cookieService: CookieService,
        public roasteryProfileService: RoasteryProfileService,
        public userService: UserserviceService,
        private fb: FormBuilder,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.transaction = this.fb.group({
            country: ['', Validators.compose([Validators.required])],
            transaction_type: [null, Validators.compose([Validators.required])],
            vat_percentage: [null, Validators.compose([Validators.required])],
            vat_type: [this.feature],
        });
        this.getVatDetails();
    }
    getVatDetails() {
        this.userService.getRoasterVatDetails(this.roasterId, this.feature).subscribe((data) => {
            this.mrList = data.result;
        });
    }
    public addNewTranscation() {
		if (!this.editIndex) {
			this.editIndex = this.mrList.length;
			this.mrList.push({
				country: '',
				transaction_type: '',
				vat_percentage: '',
			});
			this.transaction = this.fb.group({
				country: ['', Validators.compose([Validators.required])],
				transaction_type: [null, Validators.compose([Validators.required])],
				vat_percentage: [null, Validators.compose([Validators.required])],
				vat_type: [this.feature],
			});
		} else {
			this.toastrService.error('Please save the unsaved changes.');
		}
    }
    public deleteRow(index) {
		this.mrList.splice(index, 1);
		this.editIndex = null;
    }
    cancelItem(item, index) {
        if (item.id) {
            this.editIndex = null;
        } else {
            this.deleteRow(index);
        }
    }

    getCountryName(code: any) {
        const country = this.roasteryProfileService.countryList.find((con) => con.isoCode === code);
        return country ? country.name : '';
    }
    changeCountry() {
        this.roasteryProfileService.changeCountry(this.roasteryProfileService.country);
    }
    addNewVatItem(body) {
        this.userService.addVatDetails(this.roasterId, body).subscribe((result) => {
            if (result.success) {
                this.resetButtonValue = 'Save';
                const featureName = this.feature === 'mr' ? 'Micro roaster' : 'B2B';
                this.toastrService.success(`${featureName} VAT Details added successfully`);
                this.getVatDetails();
                this.editIndex = null;
            } else {
                this.toastrService.error('Error while adding VAT details');
                this.resetButtonValue = 'Save';
            }
        });
    }
    editVAT(vatItem: any, index = null) {
		if (this.editIndex === null) {
			this.eachId = vatItem.id;
			this.editIndex = index;
			this.transaction = this.fb.group({
				country: [vatItem.country.toUpperCase(), Validators.compose([Validators.required])],
				transaction_type: [vatItem.transaction_type, Validators.compose([Validators.required])],
				vat_percentage: [vatItem.vat_percentage, Validators.compose([Validators.required])],
				vat_type: [this.feature],
			});
		} else {
			this.toastrService.error('Please save the unsaved changes.');
		}
    }

    saveVATDetails(vatId: any, data) {
		const updateData =  data;
		if (!vatId) {
			this.addNewVatItem(updateData);
			return;
		}
		this.userService.updateMrVat(this.roasterId, updateData, vatId).subscribe((result) => {
            if (result.success) {
                const featureName = this.feature === 'mr' ? 'Micro roaster' : 'B2B';
                this.toastrService.success(`${featureName} VAT Details updated successfully`);
                this.getVatDetails();
                this.editIndex = null;
            } else {
                this.toastrService.error('Error while adding VAT details');
            }
        });
    }
    deleteEachVat(deleteId: any) {
        this.userService.deleteMrVat(this.roasterId, deleteId).subscribe((result) => {
            if (result.success) {
                const featureName = this.feature === 'mr' ? 'Micro roaster' : 'B2B';
                this.toastrService.success(`${featureName} VAT deleted successfully`);
                this.getVatDetails();
                this.editIndex = null;
            } else {
                this.toastrService.error('Error while deleting VAT details');
            }
        });
    }
    get detailsFormControl() {
        return this.transaction.controls;
    }
}
