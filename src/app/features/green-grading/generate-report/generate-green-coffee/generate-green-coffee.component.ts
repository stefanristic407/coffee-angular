import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { RoasterserviceService } from "src/services/roasters/roasterservice.service";
import { GenerateReportService } from "../generate-report.service";
import { ToastrService } from "ngx-toastr";
import { UserserviceService } from "src/services/users/userservice.service";
import { CookieService } from "ngx-cookie-service";
import { Router, NavigationExtras } from "@angular/router";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead";

@Component({
  selector: "app-generate-green-coffee",
  templateUrl: "./generate-green-coffee.component.html",
  styleUrls: ["./generate-green-coffee.component.css"],
})
export class GenerateGreenCoffeeComponent implements OnInit {
  cupping_type: any = "";
  cupping: any;
  showCupping: boolean = true;
  sample_size: number;
  @Output() next = new EventEmitter<any>();
  usersList: any = [];
  cupping_report_id: any;
  evaluatorsListArray: any = [];
  evaluatorData: any;
  evaluatorName: any;
  typedValue: any;
  user_id_value: any;
  selectedOption: any;
  selectedValue: any = "";
  roleName: any;
  addBtnShow: boolean = true;
  inputBoxShow: boolean = false;
  ro_id: string;
  singleCuppingDetails: any = {};
  evaluatorId: any;

  constructor(
    private roasterService: RoasterserviceService,
    public generateReportService: GenerateReportService,
    private toastrService: ToastrService,
    private userService: UserserviceService,
    public cookieService: CookieService,
    private router: Router
  ) {
    this.ro_id = this.cookieService.get("roaster_id");
    this.cupping_report_id = this.generateReportService.cuppingDetails.cupping_report_id;
  }

  ngOnInit(): void {
    this.cupping = "";
    // this.fcUsersList();
    this.evaluatorsList();
  }
  // fcUsersList(){
  //   this.roasterService.getRoasterUsers(this.fc_id).subscribe(
  //     data => {
  //       this.usersList = data['success'] ? data['result'] : []
  //       console.log(this.usersList)
  //     }
  //   )
  // }
  evaluatorsList() {
    this.userService
      .getEvaluatorsList(this.ro_id, this.cupping_report_id)
      .subscribe((response) => {
        if (response["success"] == true) {
          this.evaluatorsListArray = response["result"];
          this.evaluatorData = response["result"][0];
          this.evaluatorName = this.evaluatorData.evaluator_name;
        }
      });
  }

  ngAfterViewInit() {
    this.singleCuppingData();
  }
  singleCuppingData() {
    if (this.cupping_report_id) {
      this.userService
        .getSingleCuppingDetails(this.ro_id, this.cupping_report_id)
        .subscribe((data) => {
          if (data["success"] == true) {
            this.singleCuppingDetails = data["result"];
            this.sample_size = data["result"].sample_size;
            this.cupping = data["result"].cupping_type;
          } else {
            this.singleCuppingDetails = {};
          }
        });
    }
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    console.log(this.selectedOption.id);
    this.user_id_value = this.selectedOption.id;
    this.getUserRole(this.user_id_value);
  }
  getUserRole(val: any) {
    this.roasterService.getUserBasedRoles(this.ro_id, val).subscribe((data) => {
      if (data["success"] == true) {
        this.roleName = data["result"][0].name;
      }
    });
  }

  getUsersList(e: any) {
    this.typedValue = e.target.value;
    // if(this.typedValue.length > 2){
    this.roasterService.getRoasterUsers(this.ro_id).subscribe((data) => {
      if (data["success"] == true) {
        this.usersList = data["result"];
      } else {
        this.toastrService.error("Error while fetching users list");
      }
    });
    // }
  }

  addEvaluators() {
    if (this.selectedValue != "") {
      var data = {
        evaluator_id: this.user_id_value,
        evaluator_type: this.roleName,
      };
      this.userService
        .addEvaluators(this.cupping_report_id, data)
        .subscribe((res) => {
          if (res["success"] == true) {
            this.toastrService.success("The Evaluator has been added ");
            this.evaluatorsList();
            this.addBtnShow = true;
            this.inputBoxShow = false;
          } else {
            this.toastrService.error("Error while adding the evaluator");
          }
        });
    } else {
      this.toastrService.error("Please add the Evaulator");
    }
  }
  addBtnClick() {
    this.addBtnShow = false;
    this.inputBoxShow = true;
  }
  cancelEvaluators() {
    this.addBtnShow = true;
    this.inputBoxShow = false;
  }

  setCupping(cuppdata: any) {
    this.cupping = cuppdata;
  }
  toggleCupping() {
    this.showCupping = !this.showCupping;
    if (this.showCupping == false) {
      document.getElementById("cupping_id").style.border = "1px solid #d6d6d6";
    } else {
      document.getElementById("cupping_id").style.border = "1px solid #d6d6d6";
    }
  }
  routeToProcessDet() {
    let harv_id = this.generateReportService.cuppingDetails.harvest_id;
    console.log(harv_id);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        harvest_id: harv_id,
      },
    };

    this.router.navigate(["/features/process-details"], navigationExtras);
  }

  goNext() {
    if (this.cupping == "" || this.sample_size == undefined) {
      this.toastrService.error("Please enter cupping type & Sample size");
    } else {
      var data = {
        cupping_type: this.cupping.toUpperCase(),
        sample_size: this.sample_size,
        sample_size_unit: "gm",
      };
      this.userService
        .updateCuppingType(this.cupping_report_id, data)
        .subscribe((res) => {
          if (res["success"]) {
            this.toastrService.success("Cupping type updated");
            this.next.emit("screen3");
          } else {
            this.toastrService.error("Error while Updating");
          }
        });
      this.next.emit("screen3");
    }
  }

  deleteEvaluatorData(data: any) {
    this.evaluatorId = data;
    this.roasterService
      .deleteEvaluator(this.ro_id, this.cupping_report_id, this.evaluatorId)
      .subscribe((res) => {
        if (res["success"]) {
          this.toastrService.success("Removed assigned evaluator");
        } else if (res["messages"]) {
          this.toastrService.error(
            "Evaluator status " +
              res["messages"]["status"][0].replace("_", " ") +
              "."
          );
        } else {
          this.toastrService.error("Error while removing evaluator");
        }
      });
  }
}
