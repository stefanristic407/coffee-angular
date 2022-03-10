import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { countWords } from '@utils';

@Directive({
    selector: '[appWordLimit]',
})
export class WordLimitDirective {
    @Input() appWordLimit: number;

    private specialKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

    constructor(private el: ElementRef) {}

    // @HostListener('paste', ['$event']) // This is needed to prevent overflowing paste
    @HostListener('keydown', ['$event'])
    onKeyDown(event) {
        const availableTagList = ['INPUT', 'TEXTARE'];
        let current = '';
        if (availableTagList.indexOf(this.el.nativeElement.tagName) !== -1) {
            current = this.el.nativeElement.value;
        } else {
            const inputElement = this.el.nativeElement.querySelector('input');
            if (inputElement) {
                current = inputElement.value;
            }
        }
        let next: string;
        if (event.type === 'paste') {
            const { clipboardData } = event;
            const text = clipboardData.getData('text/plain') || clipboardData.getData('text');
            next = current.concat(text);
        } else {
            if (this.checkSpecialKeys(event)) {
                return;
            }
            next = current.concat(event.key);
        }
        const length = countWords(next);

        if (length > this.appWordLimit) {
            event.preventDefault();
        }
    }

    checkSpecialKeys(event: KeyboardEvent) {
        if (
            // Allow: Delete, Backspace, Tab, Escape, Enter, etc
            this.specialKeys.indexOf(event.key) !== -1 ||
            (event.key === 'a' && event.ctrlKey === true) || // Allow: Ctrl+A
            (event.key === 'c' && event.ctrlKey === true) || // Allow: Ctrl+C
            (event.key === 'v' && event.ctrlKey === true) || // Allow: Ctrl+V
            (event.key === 'x' && event.ctrlKey === true) || // Allow: Ctrl+X
            (event.key === 'a' && event.metaKey === true) || // Cmd+A (Mac)
            (event.key === 'c' && event.metaKey === true) || // Cmd+C (Mac)
            (event.key === 'v' && event.metaKey === true) || // Cmd+V (Mac)
            (event.key === 'x' && event.metaKey === true) // Cmd+X (Mac)
        ) {
            return true;
        } else {
            return false;
        }
    }
}
