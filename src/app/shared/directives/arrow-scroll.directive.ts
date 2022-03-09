import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Inject, Input } from '@angular/core';

@Directive({
    selector: '[appArrowScroll]',
})
export class ArrowScrollDirective implements AfterViewInit {
    @Input() step = 100;

    contentElement: HTMLElement;
    leftBtn: HTMLElement;
    rightBtn: HTMLElement;

    constructor(private el: ElementRef, @Inject(DOCUMENT) private doc: any) {}

    ngAfterViewInit() {
        this.el.nativeElement.classList.add('arrow-scroll-wrap');
        this.contentElement = this.el.nativeElement.firstChild;
        this.contentElement.classList.add('arrow-scroll-content');

        this.leftBtn = document.createElement('div');
        this.leftBtn.classList.add('scroll-left-arrow');
        this.leftBtn.addEventListener('click', (event) => {
            this.left();
        });

        this.rightBtn = document.createElement('div');
        this.rightBtn.classList.add('scroll-right-arrow');
        this.rightBtn.addEventListener('click', (event) => {
            this.right();
        });

        this.el.nativeElement.appendChild(this.leftBtn);
        this.el.nativeElement.appendChild(this.rightBtn);

        this.contentElement.addEventListener('scroll', (event) => {
            this.checkScrollState();
        });

        this.checkScrollState();
    }

    right() {
        this.contentElement.scroll({
            left: this.contentElement.scrollLeft + this.step,
            behavior: 'smooth',
        });
        this.checkScrollState();
    }

    left() {
        this.contentElement.scroll({
            left: this.contentElement.scrollLeft - this.step,
            behavior: 'smooth',
        });
        this.checkScrollState();
    }

    checkScrollState() {
        if (this.contentElement.scrollLeft <= 0) {
            this.leftBtn.classList.add('d-none');
        } else {
            this.leftBtn.classList.remove('d-none');
        }
        if (this.contentElement.clientWidth + this.contentElement.scrollLeft >= this.contentElement.scrollWidth) {
            this.rightBtn.classList.add('d-none');
        } else {
            this.rightBtn.classList.remove('d-none');
        }
    }
}
