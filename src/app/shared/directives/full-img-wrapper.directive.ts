import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appFullImgWrapper]',
})
export class FullImgWrapperDirective implements AfterViewInit {
    css = '.full-img-wrapper img {width: 100%}';
    style: any = document.createElement('style');

    constructor(private el: ElementRef) {}

    ngAfterViewInit(): void {
        if (this.style.styleSheet) {
            this.style.styleSheet.cssText = this.css;
        } else {
            this.style.appendChild(document.createTextNode(this.css));
        }
        this.el.nativeElement.classList.add('full-img-wrapper');
        this.el.nativeElement.appendChild(this.style);
    }
}
