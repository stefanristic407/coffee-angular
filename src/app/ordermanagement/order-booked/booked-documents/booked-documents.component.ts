import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'sewn-booked-documents',
  templateUrl: './booked-documents.component.html',
  styleUrls: ['./booked-documents.component.css']
})
export class BookedDocumentsComponent implements OnInit {
  appLanguage?:any;
  constructor(public global: GlobalsService) { }

  ngOnInit(): void {
    this.appLanguage = this.global.languageJson;
  }

}
