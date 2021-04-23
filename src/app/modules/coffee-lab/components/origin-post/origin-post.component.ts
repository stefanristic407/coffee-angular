import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-origin-post',
    templateUrl: './origin-post.component.html',
    styleUrls: ['./origin-post.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class OriginPostComponent implements OnInit {
    @Input() content: any;

    constructor() {}

    ngOnInit(): void {}
}
