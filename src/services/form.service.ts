import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class FormService {
    markGroupDirty(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((key) => {
            switch (formGroup.get(key).constructor.name) {
                case 'FormGroup':
                    this.markGroupDirty(formGroup.get(key) as FormGroup);
                    break;
                case 'FormArray':
                    this.markArrayDirty(formGroup.get(key) as FormArray);
                    break;
                case 'FormControl':
                    this.markControlDirty(formGroup.get(key) as FormControl);
                    break;
            }
        });
    }

    markArrayDirty(formArray: FormArray) {
        formArray.controls.forEach((control) => {
            switch (control.constructor.name) {
                case 'FormGroup':
                    this.markGroupDirty(control as FormGroup);
                    break;
                case 'FormArray':
                    this.markArrayDirty(control as FormArray);
                    break;
                case 'FormControl':
                    this.markControlDirty(control as FormControl);
                    break;
            }
        });
    }

    markControlDirty(formControl: FormControl) {
        formControl.markAsDirty();
    }
}
