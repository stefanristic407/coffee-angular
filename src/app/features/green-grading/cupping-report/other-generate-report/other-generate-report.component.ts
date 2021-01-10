import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { CuppingReportService } from '../cupping-report.service';
import { YourServicesService } from 'src/services/your-services/your-services.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GenerateReportService } from '../../generate-report/generate-report.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-other-generate-report',
	templateUrl: './other-generate-report.component.html',
	styleUrls: ['./other-generate-report.component.css']
})
export class OtherGenerateReportComponent implements OnInit {

	ro_id: any;
	mainData: any;
	eachServiceData: any;
	cupping_report_id: any;
	singleCuppingDetails: any;
	average_score: any;
	cupping_type: any;
	generated_on: any;
	version: any;
	evaluatorData: any;
	evaluatorName: any;
	evaluatorsListArray: any = [];
	filterEval: any = [];
	evaluatorIdArray: any = [];
	evalData: any = [];
	evalIds: any;

	constructor(public globals: GlobalsService, public cuppingService: CuppingReportService, private router: Router,
		public yourService: YourServicesService, private roasterService: RoasterserviceService, private cookieService: CookieService,
		private userService: UserserviceService, private toastrService: ToastrService, public generateReportService: GenerateReportService) {
		this.ro_id = this.cookieService.get('roaster_id');
		this.ViewCuppingInviteList();
		this.evaluatorsList();
		this.singleCuppingData();
	}

	ngOnInit(): void {
	}

	ViewCuppingInviteList() {
		this.roasterService.listCuppingRequest(this.ro_id).subscribe(res => {
			this.mainData = res['success'] ? res['result'] : [];
			if (this.cuppingService.otherReportDetails) {
				let eachServiceValue = this.mainData.filter(ele => ele.cupping_report_id == this.cuppingService.otherReportDetails['cupping_report_id']);
				this.eachServiceData = eachServiceValue[0];
			}
		});
	}

	singleCuppingData() {
		if (this.cuppingService.otherReportDetails) {
			this.cupping_report_id = this.cuppingService.otherReportDetails.cupping_report_id;
			this.userService.getSingleCuppingDetails(this.ro_id, this.cupping_report_id).subscribe(
				data => {
					if (data['success'] == true) {
						this.singleCuppingDetails = data['result'];
						this.average_score = this.singleCuppingDetails.average_score;
						this.cupping_type = this.singleCuppingDetails.cupping_type;
						this.generated_on = this.singleCuppingDetails.generated_on;
						this.version = this.singleCuppingDetails.version;
					}
					else {
						this.singleCuppingDetails = {};
						this.toastrService.error("Error while loading cupping details");
					}
				}
			)
		}
	}

	evaluatorsList() {
		if (this.cuppingService.otherReportDetails) {
			this.cupping_report_id = this.cuppingService.otherReportDetails.cupping_report_id;
			this.roasterService.getEvaluatorsList(this.ro_id, this.cupping_report_id).subscribe(
				response => {
					if (response['success'] == true) {
						response['result'].forEach(element => {
							this.evaluatorIdArray.push(element.evaluator_id);
							this.evalData.push(element);
						});
						this.evaluatorData = response['result'].filter(ele => ele.is_primary == true);
						this.evaluatorName = this.evaluatorData[0].evaluator_name;
						this.evaluatorsListArray = response['result'].filter(ele => ele.is_primary != true);
					}
				}
			)
		}
	}

	downloadPdf() {
		if (this.cuppingService.otherReportDetails) {
			if (this.filterEval.length) {
				this.cupping_report_id = this.cuppingService.otherReportDetails.cupping_report_id;
				this.evalIds = this.filterEval.toString();
				this.userService.downloadReportEvaluator(this.ro_id, this.cupping_report_id, this.evalIds).subscribe(
					res => {
						if (res['success'] == true) {
							this.toastrService.success('The report has been downloaded');
							this.downloadFile(res['result']['url']);
						}
						else {
							this.toastrService.error("Cupping Scores not found!");
						}
					}
				)
			}
			else {
				this.toastrService.error("Please select evaluators");
			}

		}
	}

	downloadFile(item: any) {
		const a = document.createElement("a");
		a.href = item;
		a.download = "report" + ".pdf";
		a.target = "_blank";
		// document.body.appendChild(a);
		a.click();
		// document.body.removeChild(a); 
	}

	selectEval(event, value) {
		if (event.target.checked) {
			if (!this.filterEval.includes(value)) {
				this.filterEval.push(value);
			}
		}
		else {
			if (this.filterEval.includes(value)) {
				const index = this.filterEval.indexOf(value);
				this.filterEval.splice(index, 1);
			}
		}
	}

}
