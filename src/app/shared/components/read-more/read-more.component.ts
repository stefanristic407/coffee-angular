import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-read-more',
    templateUrl: './read-more.component.html',
    styleUrls: ['./read-more.component.scss'],
})
export class ReadMoreComponent implements AfterViewInit {
    @ViewChild('contentDom') contentDom: ElementRef;
    @ViewChild('buttonDom') buttonDom: ElementRef;
    @Input() content: any;
    @Input() rows = 1;
    public contentVisibility = false;
    lineHeight: any = 16;

    ngAfterViewInit() {
        setTimeout(() => {
            this.lineHeight = window.getComputedStyle(this.contentDom.nativeElement).lineHeight;
            if (this.lineHeight === 'normal') {
                this.lineHeight = Math.ceil(
                    +window.getComputedStyle(this.contentDom.nativeElement).fontSize.replace('px', '') * 1.25,
                );
            } else {
                this.lineHeight = +this.lineHeight.replace('px', '');
            }
            if (this.contentDom.nativeElement.scrollHeight <= this.lineHeight * this.rows) {
                this.buttonDom.nativeElement.style.display = 'none';
            }
        });
    }

    public toggleContent(event) {
        event.stopPropagation();
        event.preventDefault();
        this.contentVisibility = !this.contentVisibility;
    }
}
