import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'sewn-prebook-documents',
  templateUrl: './prebook-documents.component.html',
  styleUrls: ['./prebook-documents.component.css']
})
export class PrebookDocumentsComponent implements OnInit {
  appLanguage? :any;
  constructor(public global: GlobalsService) { }

  ngOnInit(): void {
    this.appLanguage = this.global.languageJson;
  }

}
