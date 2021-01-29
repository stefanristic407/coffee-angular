import { serviceCommunicationType } from '@models/message';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chatSubject = new Subject<{
    requestType: serviceCommunicationType,
    payload?: any,
  }>();
  constructor() { }

  public showChatPanel() {
    this.chatSubject.next({
      requestType: serviceCommunicationType.SHOW_CHAT
    });
  }
  public closeChatPanel() {
    this.chatSubject.next({
      requestType: serviceCommunicationType.CLOSE_CHAT
    });
  }

  public openChatThread() {
    this.chatSubject.next({
      requestType: serviceCommunicationType.OPEN_THREAD
    });
  }

  public toggle() {
    this.chatSubject.next({
      requestType: serviceCommunicationType.TOGGLE
    });
  }
}
