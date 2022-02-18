import { Location } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from '@services';

@Directive({
    selector: '[appBackLink]',
})
export class BackLinkDirective implements AfterViewInit {
    @Output() handleBack = new EventEmitter();
    @Input() defaultBackTo: string;

    constructor(
        private el: ElementRef,
        private location: Location,
        private router: Router,
        private routerServie: RouterService,
    ) {}

    ngAfterViewInit(): void {
        this.el.nativeElement.addEventListener('click', (event) => {
            if (this.handleBack.observers.length) {
                this.handleBack.emit();
            } else if (this.routerServie.hasBack) {
                this.location.back();
            } else {
                this.router.navigate([this.defaultBackTo]);
            }
        });
    }
}
