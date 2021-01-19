import { Component, OnInit } from "@angular/core";
import { UserserviceService } from "src/services/users/userservice.service";
import { ToastrService } from "ngx-toastr";
import { CookieService } from "ngx-cookie-service";
import { Router, ActivatedRoute } from "@angular/router";
import { RoasterserviceService } from "src/services/roasters/roasterservice.service";

@Component({
  selector: "app-mr-request-details",
  templateUrl: "./mr-request-details.component.html",
  styleUrls: ["./mr-request-details.component.css"],
})
export class MrRequestDetailsComponent implements OnInit {
  roaster_id: string;
  request_id: any;
  requestData: any;
  requestPending: boolean;
  requestAvailable: boolean;
  requestCancel: boolean;
  constructor(
    private roasterService: RoasterserviceService,
    private cookieService: CookieService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.roaster_id = this.cookieService.get("roaster_id");
  }

  ngOnInit(): void {
    this.request_id = this.route.snapshot.params["id"];
    this.getRequestDetails(this.request_id);
  }

  getRequestDetails(value: any) {
    this.roasterService
      .getAvailableRequestDetail(this.roaster_id, value)
      .subscribe((data) => {
        if (data["success"] == true) {
          this.requestData = data["result"];
          if (this.requestData.status == "APPROVAL_PENDING") {
            this.requestPending = true;
          } else if (this.requestData.status == "APPROVED") {
            this.requestAvailable = true;
          } else if (this.requestData.status == "REJECTED") {
            this.requestCancel = true;
          }
        } else {
          this.toastrService.error("Error while getting the details");
        }
      });
  }

  notifyNow() {
    this.roasterService
      .updateAvailabilityStatus(this.roaster_id, this.request_id, "approve")
      .subscribe((data) => {
        if (data["success"] == true) {
          this.toastrService.success("Microroaster will be notified.");
          this.requestAvailable = true;
          this.requestPending = false;
        } else {
          this.toastrService.error("Error while approving");
        }
      });
  }
  cancelCall() {
    this.roasterService
      .updateAvailabilityStatus(this.roaster_id, this.request_id, "reject")
      .subscribe((data) => {
        if (data["success"] == true) {
          this.toastrService.success("Request has been cancelled.");
          this.requestPending = false;
          this.requestCancel = true;
        } else {
          this.toastrService.error("Error while cancelling");
        }
      });
  }
}
