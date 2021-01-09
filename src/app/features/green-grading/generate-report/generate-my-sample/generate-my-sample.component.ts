import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { RoasterserviceService } from "src/services/roasters/roasterservice.service";
import { UserserviceService } from "src/services/users/userservice.service";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { GenerateReportService } from "../generate-report.service";

@Component({
  selector: "app-generate-my-sample",
  templateUrl: "./generate-my-sample.component.html",
  styleUrls: ["./generate-my-sample.component.css"],
})
export class GenerateMySampleComponent implements OnInit {
  // val3: 20;
  // val4: 20;
  langChips: any = [];
  selectable = true;
  removable = true;
  @Output() next = new EventEmitter<any>();

  cupping_report_id: any;
  singleCuppingDetails: any = {};
  evaluatorsListArray: any = [];
  evaluatorData: any;
  evaluatorName: any;
  totalColors: any = [];
  flavourArray: any = [];

  final_score: any;
  overall_score: any;
  balance_score: any;
  uniformity_score: any;
  uniformity_comment: any;
  cleancup_score: any;
  cleancup_comment: any;
  sweetness_score: any;
  sweetness_comment: any;
  comments: any;
  body_score: any;
  acidity_score: any;
  aftertaste_score: any;
  flavor_score: any;
  fragrance_dry: any = 0;
  fragrance_break: any = 0;
  fragrance: any;
  roast_level: any;
  defects_no_of_cups: any;
  acidity_intensity: any = 1;
  body_level: any = 1;
  uniformity_value: any;
  cleancup_value: any;
  sweetness_value: any;
  btnToggle = true;
  defectIntensity: string;
  cupping_score_id: any;
  sample_id: any;
  cupping_date: any;
  is_included: any;
  getFlavourArray: any;
  roaster_id: string;

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
  }

  ngOnInit(): void {
    $(".btn-toggle").click(function () {
      $(this).find(".btn").toggleClass("active");
      $(this).find(".btn").toggleClass("active_default");
      $(this).find(".btn").toggleClass("disable_default");
    });

    this.getCuppingScoreDetails();

    // $('.toggle_butn').click(function () {
    //   $(this).find('.btn').toggleClass('active');
    //   $(this).find('.btn').toggleClass('taint_default');
    //   $(this).find('.btn').toggleClass('fault_default');
    // });

    this.evaluatorsList();

    this.flavourProfileList();
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
  flavourProfileList() {
    this.userService.getFlavourProfile().subscribe((data) => {
      if (data["success"] == true) {
        this.flavourArray = data["result"];
      }
    });
  }

  getCuppingScoreDetails() {
    this.userService
      .getCuppingScore(this.roaster_id, this.cupping_report_id)
      .subscribe((res) => {
        if (res["success"] == true) {
          this.cupping_score_id = res["result"].id;
          this.sample_id = res["result"].sample_id;
          this.cupping_date = res["result"].cupping_date;
          this.is_included = res["result"].is_included;
          this.roast_level = res["result"].roast_level;
          this.fragrance = res["result"].fragrance;
          this.fragrance_break = res["result"].fragrance_break;
          this.fragrance_dry = res["result"].fragrance_dry;
          this.flavor_score = res["result"].flavor_score;
          this.aftertaste_score = res["result"].aftertaste_score;
          this.acidity_score = res["result"].acidity_score;
          this.acidity_intensity = res["result"].acidity_intensity;
          this.body_score = res["result"].body_score;
          this.body_level = res["result"].body_level;
          this.uniformity_score = res["result"].uniformity_score;
          this.uniformity_value = res["result"].uniformity_value;
          this.uniformity_comment = res["result"].uniformity_comment;
          this.balance_score = res["result"].balance_score;
          this.cleancup_score = res["result"].cleancup_score;
          this.cleancup_value = res["result"].cleancup_value;
          this.cleancup_comment = res["result"].cleancup_comment;
          this.sweetness_score = res["result"].sweetness_score;
          this.sweetness_value = res["result"].sweetness_value;
          this.sweetness_comment = res["result"].sweetness_comment;
          this.overall_score = res["result"].overall_score;
          this.defects_no_of_cups = res["result"].defects_no_of_cups;
          this.defectIntensity = res["result"].defects_intensity;
          this.btnToggle = this.defectIntensity == "Taint" ? true : false;
          this.final_score = res["result"].final_score;
          this.comments = res["result"].comments;
          this.getFlavourArray = res["result"].descriptors;
        }
      });
  }

  selectColor(event: any, section: any, value: any) {
    console.log(event.target.value, value);
    if (section == "roastLevel") {
      if (event.target.checked) {
        this.roast_level = value;
      } else {
        this.roast_level = 0;
      }
    } else if (section == "acidity") {
      if (event.target.checked) {
        this.acidity_intensity = value;
      } else {
        this.acidity_intensity = 1;
      }
    } else if (section == "body") {
      if (event.target.checked) {
        this.body_level = value;
      } else {
        this.body_level = 1;
      }
    } else if (section == "uniformity") {
      if (event.target.checked) {
        this.uniformity_value = value;
      } else {
        this.uniformity_value = 0;
      }
    } else if (section == "cleanCup") {
      if (event.target.checked) {
        this.cleancup_value = value;
      } else {
        this.cleancup_value = 0;
      }
    } else if (section == "sweetness") {
      if (event.target.checked) {
        this.sweetness_value = value;
      } else {
        this.sweetness_value = 0;
      }
    } else if (section == "defects") {
      if (event.target.checked) {
        this.defects_no_of_cups = value;
      } else {
        this.defects_no_of_cups = 0;
      }
    }
  }
  changeDefectIntensity() {
    this.btnToggle = !this.btnToggle;
    if (this.btnToggle == true) {
      this.defectIntensity = "Taint";
      console.log(this.defectIntensity);
    } else {
      this.defectIntensity = "Fault";
      console.log(this.defectIntensity);
    }
  }

  evaluatorsList() {
    this.userService
      .getEvaluatorsList(this.roaster_id, this.cupping_report_id)
      .subscribe((response) => {
        if (response["success"] == true) {
          this.evaluatorData = response["result"].filter(
            (ele) => ele.is_primary == true
          );
          this.evaluatorName = this.evaluatorData[0].evaluator_name;
          this.evaluatorsListArray = response["result"].filter(
            (ele) => ele.is_primary != true
          );
        }
      });
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

  addLang(value: any) {
    const id = value.id;
    const name = value.name;

    // Add our fruit
    if ((name || "").trim() && value) {
      this.langChips.push(value);
      this.totalColors.push(id);
    }

    console.log(this.totalColors);

    // // Reset the input value
    // if (input) {
    //   input.value = '';
    // }
  }

  remove(lang: any): void {
    const index = this.langChips.indexOf(lang);
    // this.langChips.slice(lang);

    console.log(this.flavourArray);
    if (index >= 0) {
      this.langChips.splice(index, 1);
      this.flavourArray.splice(index, 1);
    }
  }

  goNext() {
    if (
      this.final_score == undefined ||
      this.overall_score == undefined ||
      this.comments == ""
    ) {
      this.toastrService.error("Please fill all the details");
    } else {
      var data = {
        roast_level: this.roast_level,
        fragrance_score: this.fragrance,
        fragrance_dry: this.fragrance_dry,
        fragrance_break: this.fragrance_break,
        fragrance_qualities: "Quality #1",
        flavour_score: this.flavor_score,
        aftertaste_score: this.aftertaste_score,
        acidity_score: this.acidity_score,
        acidity_intensity: this.acidity_intensity,
        body_score: this.body_score,
        body_level: this.body_level,
        uniformity_score: this.uniformity_score,
        uniformity_value: this.uniformity_value,
        uniformity_comment: this.uniformity_comment,
        balance_score: this.balance_score,
        cleancup_score: this.cleancup_score,
        cleancup_value: this.cleancup_value,
        cleancup_comment: this.cleancup_comment,
        sweetness_score: this.sweetness_score,
        sweetness_value: this.sweetness_value,
        sweetness_comment: this.sweetness_comment,
        overall_score: this.overall_score,
        defects_no_of_cups: this.defects_no_of_cups,
        defects_intensity: this.defectIntensity,
        total_score: this.final_score,
        final_score: this.final_score,
        flavour_profile_ids: this.totalColors,
        comments: this.comments,
      };
      this.userService
        .addCuppingScore(this.roaster_id, this.cupping_report_id, data)
        .subscribe((data) => {
          if (data["success"] == true) {
            this.toastrService.success("Final Score details has been updated");
            this.next.emit("screen4");
          } else {
            this.toastrService.error("Please fill all the details");
          }
        });
    }
  }
}
