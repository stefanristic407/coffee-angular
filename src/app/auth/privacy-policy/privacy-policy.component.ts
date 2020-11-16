import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { UserserviceService } from 'src/services/users/userservice.service';

@Component({
  selector: "app-privacy-policy",
  templateUrl: "./privacy-policy.component.html",
  styleUrls: ["./privacy-policy.component.css"]
})
export class PrivacyPolicyComponent implements OnInit {
  agree_terms : boolean = false;
  agree_policy : boolean = false;
  access_chat : boolean = false;
  access_data : boolean = false;
  access_details : boolean = false;

  resetButtonValue: string = "Next";
  constructor(private cookieService: CookieService, private router: Router,
    public toastrService  : ToastrService, private userService : UserserviceService) {}

  ngOnInit(): void {
    //Auth checking
  
  }

  public next(){
    this.resetButtonValue = "Updating";
    if(this.access_details == false || this.access_chat == false || this.access_data == false || this.agree_policy == false || this.agree_terms == false){
      this.toastrService.error("Please accept the terms and conditions");
      }
      else{
        var data = {
          "access_account": this.access_details,
          "access_data": this.access_data,
          "access_chat": this.access_chat,
          "agree_privacy": this.agree_policy,
          "agree_terms": this.agree_terms
        }
        this.userService.privacyTerms(data).subscribe(
          res => {
            if(res['success'] == true){
              this.resetButtonValue = "Next";
              this.toastrService.success("Privacy terms accepted.");
              this.router.navigate(['/auth/update-password']);
            }
            else{
              this.resetButtonValue = "Next";
              this.toastrService.error("Error in accepting privacy terms. Please try again");
            }
          }
        )
        this.resetButtonValue = "Next";
      } 
      
  }
}
