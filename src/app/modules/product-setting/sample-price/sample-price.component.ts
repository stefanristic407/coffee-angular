import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QUANTIRY_UNIT_LIST } from '@constants';
import { QuantityUnit } from '@enums';
import { OrderSettings } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { RoasterService } from '@services';
import { convert2Kg, convertKg } from '@utils';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-sample-price',
    templateUrl: './sample-price.component.html',
    styleUrls: ['./sample-price.component.scss'],
})
export class SamplePriceComponent implements OnInit {
    loading = false;
    editshippingmode = false;
    detailsForm: FormGroup;
    orderSettings: OrderSettings;
    submitted = false;
    QuantityUnitItems = [
        { label: 'lb', value: QuantityUnit.lb },
        { label: 'kg', value: QuantityUnit.kg },
        { label: 'g', value: QuantityUnit.g },
    ];

    constructor(
        private roasterService: RoasterService,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private translator: TranslateService,
    ) {}

    ngOnInit(): void {
        this.detailsForm = this.fb.group({
            sample_price: [null, Validators.compose([Validators.required, Validators.min(0)])],
            sample_quantity: [null, Validators.compose([Validators.required, Validators.min(1)])],
            sample_quantity_unit: [QuantityUnit.g, Validators.compose([Validators.required])],
        });

        this.getOrderSettings();
    }

    getOrderSettings() {
        this.loading = true;
        this.roasterService.getOrderSettings().subscribe((res: any) => {
            if (res.success) {
                // Quantity is saved as kg
                this.orderSettings = {
                    ...res.result,
                    sample_quantity_unit: res.result.sample_quantity_unit || QuantityUnit.g,
                    sample_quantity: convertKg(res.result.sample_quantity, res.result.sample_quantity_unit),
                };
            }
            this.loading = false;
        });
    }

    onEdit() {
        this.detailsForm.patchValue(this.orderSettings);
        this.editshippingmode = true;
    }

    onCancel() {
        this.detailsForm.reset();
        this.editshippingmode = false;
    }

    onSave() {
        if (!this.detailsForm.valid) {
            this.detailsForm.markAllAsTouched();
            this.toastrService.error(this.translator.instant('please_check_form_data'));
        }
        // Quantity is saved as kg
        this.submitted = true;
        this.roasterService
            .updateOrderSettings({
                ...this.detailsForm.value,
                sample_quantity: convert2Kg(
                    this.detailsForm.value.sample_quantity,
                    this.detailsForm.value.sample_quantity_unit,
                ),
            })
            .subscribe((res: any) => {
                if (res.success) {
                    this.getOrderSettings();
                    this.onCancel();
                    this.toastrService.success('Simple price updated successfully');
                }
                this.submitted = false;
            });
    }
}
