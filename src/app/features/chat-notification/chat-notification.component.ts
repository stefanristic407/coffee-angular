import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/services/users/userservice.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-chat-notification',
  templateUrl: './chat-notification.component.html',
  styleUrls: ['./chat-notification.component.css']
})
export class ChatNotificationComponent implements OnInit {
  receipt: boolean = false;
  keyboard: boolean = false;
  notify: boolean = false;
  updates : boolean = false;
  chat: boolean =false;
  sound :boolean =false;
  termStatus: any = "normal";
  showRelavant:boolean=true;
  farmSize : string;
  quantity: string;
  roasterId: string;
  appLanguage?: any;
  preferActive:any=0;
  resetButtonValue : string = "Save changes";
  constructor(public userService : UserserviceService,
              public router : Router,
              public toastrService : ToastrService,
              public cookieService : CookieService,
              public globals : GlobalsService) { 
                this.roasterId = this.cookieService.get('roaster_id');
              }

  ngOnInit(): void {

    this.getPreferences();
    this.language();
    }
  language(){
    this.appLanguage = this.globals.languageJson;
       this.preferActive++;
    }
  setStatus(term: any) {
    this.termStatus = term;
  }
  toggleRelavant(){
    this.showRelavant = !this.showRelavant;

  }

  getPreferences(){

    this.userService.getPreferences(this.roasterId).subscribe(
      data => {
        if(data['success']==true){
          this.farmSize = data['result'].farm_size_unit;
          this.quantity = data['result'].quantity_unit;
          this.receipt = data['result'].read_recipient;
          this.keyboard = data['result'].enable_emoticons;
          this.termStatus = data['result'].chat_text_size;
          this.notify = data['result'].enable_desktop_notification;
          this.updates = data['result'].order_related_updates;
          this.chat = data['result'].new_chat_notification;
          this.sound = data['result'].notification_sound;
          if(this.termStatus == ""){
            this.termStatus = "normal";
          }else{
            this.termStatus = this.termStatus;
          }
        }else{
          this.toastrService.error("Error while getting the preferences setting");
        }
        this.preferActive++;
      }
    )

  }


  updatePreferences(){
    this.resetButtonValue = "Saving";
    var data = {
      'farm_size_unit' : this.farmSize,
      'quantity_unit' : this.quantity,
      'read_recipient' : this.receipt,
      'enable_emoticons' : this.keyboard,
      'chat_text_size' : this.termStatus,
      'enable_desktop_notification' : this.notify,
      'order_related_updates'  : this.updates,
      'new_chat_notification' : this.chat,
      'notification_sound' : this.sound
    }
    console.log(data);
    this.userService.updatePreferences(this.roasterId,data).subscribe(
      result => {
        if(result['success'] == true){
          this.resetButtonValue = "Save changes";
          this.toastrService.success("Preferences updated successfully!");
          this.router.navigate(['/features/account-settings']);
        }else{
          this.toastrService.error("Error while Updating the preferences Setting! , Please try again.")
        }
      }
    )
  }

}
