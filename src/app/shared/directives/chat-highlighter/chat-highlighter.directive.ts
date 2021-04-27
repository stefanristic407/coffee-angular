import { DomSanitizer } from '@angular/platform-browser';
import { Directive, Input, OnChanges, OnInit, SimpleChanges, ElementRef, Renderer2 } from '@angular/core';
import DOMPurify from 'dompurify';
@Directive({
    selector: '[appChatHighlighter]',
})
export class ChatHighlighterDirective implements OnChanges, OnInit {
    @Input() searchKey: string;
    @Input() messageContent: string;

    constructor(private el: ElementRef, private renderer: Renderer2, protected sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.render();
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.render();
    }

    render() {
        if (!this.searchKey) {
            this.renderer.setProperty(this.el.nativeElement, 'innerText', this.messageContent);
        } else {
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.getFormattedText());
        }
    }

    getFormattedText() {
        const sanitizedContent = DOMPurify.sanitize(this.messageContent) || '';
        const sanitizedKey = DOMPurify.sanitize(this.searchKey);
        const regexSanitizedKey = sanitizedKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const searchRegx = new RegExp(regexSanitizedKey, 'gi');
        const content = sanitizedContent.replace(searchRegx, '<span class="dm-highlight-marker">$&</span>');
        return content;
    }
}
