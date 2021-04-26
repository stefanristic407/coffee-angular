import { Component, OnInit, Input } from '@angular/core';
import { GlobalsService } from '@services';

@Component({
    selector: 'app-translate-toast',
    templateUrl: './translate-toast.component.html',
    styleUrls: ['./translate-toast.component.scss'],
})
export class TranslateToastComponent implements OnInit {
    @Input() language;

    constructor(public globalsService: GlobalsService) {}

    ngOnInit(): void {}
}
