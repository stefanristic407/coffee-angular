import { ChatHandlerService } from '../../../../../services/chat/chat-handler.service';
import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { SourcingService } from '../../sourcing.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
    brandProfileEstateWeb = 'https://qa-brand-profile.sewnstaging.com/estatebrandprofile/green-coffee';

    constructor(public globals: GlobalsService, public sourcing: SourcingService, public chat: ChatHandlerService) {}

    ngOnInit(): void {}
    message() {
        this.chat.showChatPanel();
    }
}
