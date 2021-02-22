import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search-panel',
    templateUrl: './search-panel.component.html',
    styleUrls: ['./search-panel.component.scss'],
})
export class SearchPanelComponent implements OnInit {
    @Output() closeEmitter = new EventEmitter();
    @Input() searchStr = '';
    results: any[];
    @Input()
    set searchResults(value: any[]) {
        console.log(value);
        this.results = value;
    }

    constructor(private router: Router) {}

    ngOnInit(): void {}

    navigate(url) {
        this.router.navigateByUrl(url);
        this.closePanel();
    }

    closePanel() {
        this.closeEmitter.emit();
    }
}
