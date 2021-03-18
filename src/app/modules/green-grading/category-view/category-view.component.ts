import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-category-view',
    templateUrl: './category-view.component.html',
    styleUrls: ['./category-view.component.scss'],
})
export class CategoryViewComponent implements OnInit {
    @Input() categoryData;
    @Input() categoryList;
    @Input() categoryDefects;
    @Input() categoryIndex;
    @Input() readonly;
    @Output() handleChange = new EventEmitter<any>();
    @Output() handleDefectsChange = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {}

    onChange() {
        this.handleChange.emit(this.categoryData);
    }

    onChangeDefects() {
        this.handleDefectsChange.emit({
            index: this.categoryIndex,
            value: this.categoryDefects,
        });
    }
}
