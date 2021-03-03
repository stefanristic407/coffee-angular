import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';

@Component({
    selector: 'sewn-prebook-documents',
    templateUrl: './prebook-documents.component.html',
    styleUrls: ['./prebook-documents.component.css'],
})
export class PrebookDocumentsComponent implements OnInit {
    appLanguage?: any;
    constructor(public globals: GlobalsService) {}

    ngOnInit(): void {
        this.appLanguage = this.globals.languageJson;
    }
}
