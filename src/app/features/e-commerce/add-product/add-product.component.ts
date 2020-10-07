import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  appLanguage: any;

  constructor(private globals: GlobalsService) { }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
  }

}
