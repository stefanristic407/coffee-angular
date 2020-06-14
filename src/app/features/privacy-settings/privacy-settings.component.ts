import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-settings',
  templateUrl: './privacy-settings.component.html',
  styleUrls: ['./privacy-settings.component.css']
})
export class PrivacySettingsComponent implements OnInit {
  account: boolean = true;
  data: boolean = false;
  chat: boolean = false;
  cookies : boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
