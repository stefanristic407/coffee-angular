import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-notification',
  templateUrl: './chat-notification.component.html',
  styleUrls: ['./chat-notification.component.css']
})
export class ChatNotificationComponent implements OnInit {
  receipt: boolean = true;
  keyboard: boolean = false;
  notify: boolean = true;
  updates : boolean = false;
  chat: boolean =false;
  sound :boolean =true;

  constructor() { }

  ngOnInit(): void {
  }

}
