import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, HostListener, Inject, Input } from '@angular/core';
declare var $: any;

@Directive({
    selector: '[appRating]',
})
export class RatingDirective implements AfterViewInit {
    stars: HTMLElement[];
    constructor(private el: ElementRef, @Inject(DOCUMENT) private doc: any) {}

    ngAfterViewInit() {
        this.stars = this.el.nativeElement.firstChild.children;
        for (let index = 0; index < 5; index++) {
            const element = this.stars[index];
            element.addEventListener('pointerenter', (event) => {
                this.enterStar(index);
            });
            element.addEventListener('pointerleave', (event) => {
                this.leaveStar(index);
            });
        }
    }

    enterStar(hoverIdx) {
        for (let index = 0; index < 5; index++) {
            const element = this.stars[index];
            if (index > hoverIdx) {
                element.classList.remove('sibling-enter');
                element.classList.add('sibling-leave');
            } else {
                element.classList.add('sibling-enter');
                element.classList.remove('sibling-leave');
            }
        }
    }

    leaveStar(hoverIdx) {
        for (let index = 0; index < 5; index++) {
            const element = this.stars[index];
            element.classList.remove('sibling-enter');
            element.classList.remove('sibling-leave');
        }
    }
}
