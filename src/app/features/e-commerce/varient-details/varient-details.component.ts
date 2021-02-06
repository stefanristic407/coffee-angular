import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-varient-details',
    templateUrl: './varient-details.component.html',
    styleUrls: ['./varient-details.component.scss'],
})
export class VarientDetailsComponent implements OnInit {
    weightForm: FormGroup;
    weights: FormArray;
    grind_varient: FormArray;
    @Input() varientDetails: any;
    currentVarientIndex = 0;
    statusArray: any = [];
    grindArray: any = [];
    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.weightForm = this.fb.group({
            variant_name: '',
            weights: this.fb.array([this.createEmptyWeights()]),
        });
        this.statusArray = [
            { label: 'In Stock', value: 'in-stock' },
            { label: 'Out of Stock', value: 'out-of-stock' },
        ];
        this.grindArray = [
            { label: 'Whole beans', value: 'beans' },
            { label: 'Extra Coarse', value: 'extra-coarse' },
            { label: 'Coarse', value: 'coarse' },
            { label: 'Medium Coarse', value: 'medium-coarse' },
            { label: 'Medium', value: 'medium' },
            { label: 'Fine', value: 'fine' },
        ];
    }
    addNewWeights(): void {
        this.weights = this.weightForm.get('weights') as FormArray;
        this.weights.push(this.createEmptyWeights());
    }
    addNewGrindVarients(): void {
        const weight = this.weightForm.get('weights') as FormArray;
        this.grind_varient = weight['controls'][this.currentVarientIndex].get('grind_varient') as FormArray;
        this.grind_varient.push(this.createEmptyGrindVarient());
    }

    createEmptyWeights() {
        return this.fb.group({
            weight_name: 'weight - 0 lb',
            weight_unit: 'lb',
            weight: ['0', Validators.compose([Validators.required])],
            status: ['', Validators.compose([Validators.required])],
            hide_product: [false, Validators.compose([Validators.required])],
            default_product: [false, Validators.compose([Validators.required])],
            grind_varient: this.fb.array([this.createEmptyGrindVarient()]),
        });
    }
    createEmptyGrindVarient() {
        return this.fb.group({
            price: ['', Validators.compose([Validators.required])],
            grind: ['', Validators.compose([Validators.required])],
            stock_available: ['', Validators.compose([Validators.required])],
            sku_number: ['', Validators.compose([Validators.required])],
        });
    }

    deleteGrindVariant(idx) {
        console.log(idx);
        const weight = this.weightForm.get('weights') as FormArray;
        this.grind_varient = weight['controls'][this.currentVarientIndex].get('grind_varient') as FormArray;
        this.grind_varient.removeAt(idx);
    }
}
