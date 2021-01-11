import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { GenerateReportService } from "../generate-report.service";
import { UserserviceService } from "src/services/users/userservice.service";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-generate-coffee-grading",
  templateUrl: "./generate-coffee-grading.component.html",
  styleUrls: ["./generate-coffee-grading.component.css"],
})
export class GenerateCoffeeGradingComponent implements OnInit {
  @Output() next = new EventEmitter<any>();
  roaster_id: any;
  cupping_id: any;
  evaluatorData: any;
  evaluatorName: any;
  fullblack_num: any;
  fullblack_equ: any;
  fullsour_num: any;
  fullsour_equ: any;
  driedpod_num: any;
  driedpod_equ: any;
  fungus_num: any;
  fungus_equ: any;
  matter_num: any;
  matter_equ: any;
  insect_damage_num: any;
  insect_damage_equ: any;
  category_1_defects: any;
  moisture_content: any;
  water_activity: any;
  odor: any;
  cate2_black_num: any;
  cate2_black_equ: any;
  cate2_sour_num: any;
  cate2_sour_equ: any;
  cate2_dried_num: any;
  cate2_dried_equ: any;
  cate2_floater_num: any;
  cate2_floater_equ: any;
  cate2_unripe_num: any;
  cate2_unripe_equ: any;
  cate2_withered_num: any;
  cate2_withered_equ: any;
  cate2_shells_num: any;
  cate2_shells_equ: any;
  cate2_cut_num: any;
  cate2_cut_equ: any;
  cate2_hull_num: any;
  cate2_hull_equ: any;
  cate2_insect_num: any;
  cate2_insect_equ: any;
  cat2_defects: any;
  total_defects: any;
  totalColors: any = [];
  defectsList: any;

  constructor(
    public generateService: GenerateReportService,
    private userService: UserserviceService,
    private cookieService: CookieService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.roaster_id = this.cookieService.get("roaster_id");
  }

  ngOnInit(): void {
    this.getEvaluatorData();
    this.physicalDefectsList();
  }

  getEvaluatorData() {
    this.cupping_id = this.generateService.cuppingDetails.cupping_report_id;
    this.userService
      .getEvaluatorsList(this.roaster_id, this.cupping_id)
      .subscribe((res) => {
        if (res["success"] == true) {
          this.evaluatorData = res["result"][0];
          this.evaluatorName = this.evaluatorData.evaluator_name;
        }
      });
  }

  selectColor(event, value) {
    if (event.target.checked) {
      if (!this.totalColors.includes(value)) {
        this.totalColors.push(value);
      }
      // this.colorString=this.totalColors.toString();
    } else {
      if (this.totalColors.includes(value)) {
        const index = this.totalColors.indexOf(value);
        this.totalColors.splice(index, 1);
      }
      // this.colorString=this.totalColors.toString();
    }
  }

  private validateInput() {
    let flag = true;
    if (
      this.moisture_content == "" ||
      this.water_activity == "" ||
      this.odor == "" ||
      this.totalColors == "" ||
      this.total_defects == ""
    ) {
      flag = false;
    }
    return flag;
  }

  goNext() {
    this.cupping_id = this.generateService.cuppingDetails.cupping_report_id;
    let flag = this.validateInput();
    if (flag) {
      var data = {
        full_black_no: this.fullblack_num,
        full_black_eqv: this.fullblack_equ,
        full_sour_no: this.fullsour_num,
        full_sour_eqv: this.fullsour_equ,
        dried_cherry_no: this.driedpod_num,
        dried_cherry_eqv: this.driedpod_equ,
        fungus_damaged_no: this.fungus_num,
        fungus_damaged_eqv: this.fungus_equ,
        foreign_matter_no: this.matter_num,
        foreign_matter_eqv: this.matter_equ,
        severe_insect_damage_no: this.insect_damage_num,
        severe_insect_damage_eqv: this.insect_damage_equ,
        partial_black_no: this.cate2_black_num,
        partial_black_eqv: this.cate2_black_equ,
        partial_sour_no: this.cate2_sour_num,
        partial_sour_eqv: this.cate2_sour_equ,
        parchment_no: this.cate2_dried_num,
        parchment_eqv: this.cate2_dried_equ,
        floater_no: this.cate2_floater_num,
        floater_eqv: this.cate2_floater_equ,
        immature_no: this.cate2_unripe_num,
        immature_eqv: this.cate2_unripe_equ,
        withered_no: this.cate2_withered_num,
        withered_eqv: this.cate2_withered_equ,
        shells_no: this.cate2_shells_num,
        shells_eqv: this.cate2_shells_equ,
        brocken_chipped_no: this.cate2_cut_num,
        brocken_chipped_eqv: this.cate2_cut_equ,
        hull_husk_no: this.cate2_hull_num,
        hull_husk_eqv: this.cate2_hull_equ,
        slight_insect_damage_no: this.cate2_insect_num,
        slight_insect_damage_eqv: this.cate2_insect_equ,
        total_category_one: this.category_1_defects,
        total_category_two: this.cat2_defects,
        moisture_content: this.moisture_content,
        water_activity: this.water_activity,
        odor: this.odor,
        colors: this.totalColors.toString(),
        total_green_defects: this.total_defects,
      };
      this.userService
        .addPhysicalDefects(this.roaster_id, this.cupping_id, data)
        .subscribe((res) => {
          if (res["success"] == true) {
            this.toastrService.success("Physical defects added successfully");
            this.next.emit("screen2");
          } else {
            this.toastrService.error("Error while adding physical defects");
          }
        });
    } else {
      this.toastrService.error("Fields should not be empty.");
    }
  }
  routeToProcessDet() {
    let harv_id = this.generateService.cuppingDetails.harvest_id;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        harvest_id: harv_id,
      },
    };
    this.router.navigate(["/features/process-details"], navigationExtras);
  }
  physicalDefectsList() {
    this.cupping_id = this.generateService.cuppingDetails.cupping_report_id;
    this.userService
      .getPhysicalDefectsList(this.roaster_id, this.cupping_id)
      .subscribe((res) => {
        if (res["success"] == true) {
          this.defectsList = res["result"];
          this.fullblack_num = this.defectsList.full_black_no;
          this.fullblack_equ = this.defectsList.full_black_eqv;
          this.fullsour_num = this.defectsList.full_sour_no;
          this.fullsour_equ = this.defectsList.full_sour_eqv;
          this.driedpod_num = this.defectsList.dried_cherry_no;
          this.driedpod_equ = this.defectsList.dried_cherry_eqv;
          this.fungus_num = this.defectsList.fungus_damaged_no;
          this.fungus_equ = this.defectsList.fungus_damaged_eqv;
          this.matter_num = this.defectsList.foreign_matter_no;
          this.matter_equ = this.defectsList.foreign_matter_eqv;
          this.insect_damage_num = this.defectsList.severe_insect_damage_no;
          this.insect_damage_equ = this.defectsList.severe_insect_damage_eqv;
          this.cate2_black_num = this.defectsList.partial_black_no;
          this.cate2_black_equ = this.defectsList.partial_black_eqv;
          this.cate2_sour_num = this.defectsList.partial_sour_no;
          this.cate2_sour_equ = this.defectsList.partial_sour_eqv;
          this.cate2_dried_num = this.defectsList.parchment_no;
          this.cate2_dried_equ = this.defectsList.parchment_eqv;
          this.cate2_floater_num = this.defectsList.floater_no;
          this.cate2_floater_equ = this.defectsList.floater_eqv;
          this.cate2_unripe_num = this.defectsList.immature_no;
          this.cate2_unripe_equ = this.defectsList.immature_eqv;
          this.cate2_withered_num = this.defectsList.withered_no;
          this.cate2_withered_equ = this.defectsList.withered_eqv;
          this.cate2_shells_num = this.defectsList.shells_no;
          this.cate2_shells_equ = this.defectsList.shells_eqv;
          this.cate2_cut_num = this.defectsList.brocken_chipped_no;
          this.cate2_cut_equ = this.defectsList.brocken_chipped_eqv;
          this.cate2_hull_num = this.defectsList.hull_husk_no;
          this.cate2_hull_equ = this.defectsList.hull_husk_eqv;
          this.cate2_insect_num = this.defectsList.slight_insect_damage_no;
          this.cate2_insect_equ = this.defectsList.slight_insect_damage_eqv;
          this.category_1_defects = this.defectsList.total_category_one;
          this.cat2_defects = this.defectsList.total_category_two;
          this.water_activity = this.defectsList.water_activity;
          this.odor = this.defectsList.odor;
          this.totalColors = this.defectsList.colors.split(",");
          this.total_defects = this.defectsList.total_green_defects;
          this.moisture_content = this.defectsList.moisture_content;
        } else {
          this.toastrService.error("Error while getting physical defects");
        }
      });
  }
  cancel() {
    if (this.generateService.fromQueryParam == "ServiceRequest") {
      this.router.navigate(["/features/service-request"]);
    } else if (this.generateService.fromQueryParam == "SampleRequest") {
      this.router.navigate(["/features/grade-sample"]);
    } else {
      this.router.navigate(["/features/service-request"]);
    }
  }
  skip() {
    this.next.emit("screen2");
  }
}
