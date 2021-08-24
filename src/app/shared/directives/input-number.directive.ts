import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: 'p-inputNumber[formControlName], p-inputNumber[formControl], p-inputNumber[ngModel]',
})
export class InputNumberDirective {
    constructor(private ngControl: NgControl) {}

    @HostListener('onInput', ['$event'])
    callOnInput(event) {
        this.ngControl.control.setValue(event.value);
        this.ngControl.control.markAsTouched();
    }
}
