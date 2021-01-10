import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { GenerateReportService } from "../generate-report.service";
import { ToastrService } from "ngx-toastr";
import { CookieService } from "ngx-cookie-service";
import { UserserviceService } from "src/services/users/userservice.service";
import { RoasterserviceService } from "src/services/roasters/roasterservice.service";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-generate-cupping-report",
  templateUrl: "./generate-cupping-report.component.html",
  styleUrls: ["./generate-cupping-report.component.css"],
})
export class GenerateCuppingReportComponent implements OnInit {
  @Output() next = new EventEmitter<any>();
  roaster_id: string;
  cupping_report_id: any;
  gc_order_id: any;
  sample_request_id: any;
  singleCuppingDetails: any;
  CuppingReports: any;
  evaluatorArray: any = [];
  evaluatorData: any;
  evaluatorName: any;
  cupping_id: any;
  constructor(
    public generateReportService: GenerateReportService,
    private toastrService: ToastrService,
    private cookieService: CookieService,
    private userService: UserserviceService,
    private roasterService: RoasterserviceService,
    private router: Router
  ) {
    this.roaster_id = this.cookieService.get("roaster_id");
    this.cupping_report_id = this.generateReportService.cuppingDetails.cupping_report_id;
    if (this.generateReportService.fromQueryParam == "ServiceRequest") {
      this.gc_order_id = this.generateReportService.cuppingDetails.gc_order_id;
    } else if (this.generateReportService.fromQueryParam == "SampleRequest") {
      this.sample_request_id = this.generateReportService.cuppingDetails.external_sample_id;
    }
  }

  ngOnInit(): void {
    this.getEvaluatorData();
    this.getCupReports();
  }

  getEvaluatorData() {
    this.cupping_id = this.generateReportService.cuppingDetails.cupping_report_id;
    this.roasterService
      .getEvaluatorsList(this.roaster_id, this.cupping_id)
      .subscribe((res) => {
        if (res["success"] == true) {
          this.evaluatorArray = res["result"];
          this.evaluatorData = res["result"][0];
          this.evaluatorName = this.evaluatorData.evaluator_name;
        }
      });
  }

  getCupReports() {
    if (this.generateReportService.fromQueryParam == "ServiceRequest") {
      this.roasterService
        .listServiceCuppingReports(this.roaster_id, this.gc_order_id)
        .subscribe((res) => {
          if (res["success"] == true) {
            this.CuppingReports = res["result"];
          } else {
            this.toastrService.error(
              "Error while getting the cupping reports."
            );
          }
        });
    } else {
      this.roasterService
        .listSampleCuppingReports(this.roaster_id, this.sample_request_id)
        .subscribe((res) => {
          if (res["success"] == true) {
            this.CuppingReports = res["result"];
          } else {
            this.toastrService.error(
              "Error while getting the cupping reports."
            );
          }
        });
    }
  }

  ngAfterViewInit() {
    this.singleCuppingData();
  }
  singleCuppingData() {
    if (this.cupping_report_id) {
      this.userService
        .getSingleCuppingDetails(this.roaster_id, this.cupping_report_id)
        .subscribe((data) => {
          if (data["success"] == true) {
            this.singleCuppingDetails = data["result"];
          } else {
            this.singleCuppingDetails = {};
            this.toastrService.error("Error while loading cupping details");
          }
        });
    }
  }

  routeToProcessDet() {
    let harv_id = this.generateReportService.cuppingDetails.harvest_id;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        harvest_id: harv_id,
      },
    };

    this.router.navigate(["/features/process-details"], navigationExtras);
  }

  uploadReport() {
    var data = {
      status: "COMPLETED",
    };
    this.userService
      .updateStatus(this.roaster_id, this.cupping_report_id, data)
      .subscribe((res) => {
        if (res["success"] == true) {
          this.toastrService.success("The Report has been updated.");
        } else {
          this.toastrService.error("Error while updating the report");
        }
      });
  }
  downloadFile(item: any) {
    const a = document.createElement("a");
    a.href = item;
    a.download = "Report" + ".pdf";
    a.target = "_blank";
    // document.body.appendChild(a);
    a.click();
    // document.body.removeChild(a);
  }
  downloadReport() {
    this.userService
      .downloadReport(
        this.roaster_id,
        this.cupping_report_id,
        this.evaluatorArray.map((ele) => {
          return ele.evaluator_id;
        })
      )
      .subscribe((res) => {
        if (res["success"] == true) {
          this.toastrService.success("The report has been downloaded");
          this.downloadFile(res["result"]["url"]);
        } else {
          this.toastrService.error("Cupping Scores not found!");
        }
      });
  }

  recupSample() {
    if (this.generateReportService.fromQueryParam == "ServiceRequest") {
      this.userService
        .recupSample(this.roaster_id, this.gc_order_id)
        .subscribe((res) => {
          if (res["success"] == true) {
            this.toastrService.success("Recupping has started");
            this.router.navigate(["/features/service-requests"]);
            // this.next.emit('screen1');
          } else {
            this.toastrService.error("Error while downloading report");
          }
        });
    } else {
      this.userService
        .recupSampleRequest(this.roaster_id, this.sample_request_id)
        .subscribe((res) => {
          if (res["success"] == true) {
            this.toastrService.success("Recupping has started");
            this.router.navigate(["/features/grade-sample"]);
            // this.next.emit('screen1');
          } else {
            this.toastrService.error("Error while downloading report");
          }
        });
    }
  }

  goNext() {
    this.next.emit("screen3");
  }
}
