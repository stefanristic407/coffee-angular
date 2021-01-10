import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GenerateReportService } from '../generate-report.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
@Component({
	selector: 'app-generate-cupping-results',
	templateUrl: './generate-cupping-results.component.html',
	styleUrls: ['./generate-cupping-results.component.css']
})
export class GenerateCuppingResultsComponent implements OnInit {

	@Output() next = new EventEmitter<any>();

	modalRef: BsModalRef;
	type: boolean;

	public bubbleData = [
		{
			name: 'Aroma',
			series: [
				{
					name: 'Aroma',
					x: 'Aroma',
					y: 6,
					r: 40
				}
			]
		},
		{
			name: 'Dry',
			series: [
				{
					name: 'Dry',
					x: 'Dry',
					y: -10,
					r: 40
				}
			]
		},
		{
			name: 'Break',
			series: [
				{
					name: 'Break',
					x: 'Break',
					y: 2,
					r: 40
				}
			]
		},
		{
			name: 'Flavour',
			series: [
				{
					name: 'Flavour',
					x: 'Flavour',
					y: 8,
					r: 40
				}
			]
		},
		{
			name: 'Aftertaste',
			series: [
				{
					name: 'Aftertaste',
					x: 'Aftertaste',
					y: 7,
					r: 40
				}
			]
		},
		{
			name: 'Acidity',
			series: [
				{
					name: 'Acidity',
					x: 'Acidity',
					y: -10,
					r: 40
				}
			]
		},
		{
			name: 'Body',
			series: [
				{
					name: 'Body',
					x: 'Body',
					y: 6,
					r: 40
				}
			]
		},
		{
			name: 'Balance',
			series: [
				{
					name: 'Balance',
					x: 'Balance',
					y: 10,
					r: 40
				}
			]
		},
		{
			name: 'Uniformirty',
			series: [
				{
					name: 'Uniformirty',
					x: 'Uniformirty',
					y: -10,
					r: 40
				}
			]
		},
		{
			name: 'Clean cup',
			series: [
				{
					name: 'Clean cup',
					x: 'Clean cup',
					y: -10,
					r: 40
				}
			]
		},
		{
			name: 'Sweetness',
			series: [
				{
					name: 'Sweetness',
					x: 'Sweetness',
					y: 10,
					r: 40
				}
			]
		},
		{
			name: 'Overall',
			series: [
				{
					name: 'Overall',
					x: 'Overall',
					y: -10,
					r: 40
				}
			]
		}
	];



	public scoreData = [
		{
			name: 'Aroma',
			series: [
				{
					name: 'Aroma',
					x: 'Aroma',
					y: 10,
					r: 40
				}
			]
		},
		{
			name: 'Dry',
			series: [
				{
					name: 'Dry',
					x: 'Dry',
					y: 10,
					r: 40
				}
			]
		},
		{
			name: 'Final score',
			series: [
				{
					name: 'Final score',
					x: 'Final score',
					y: 10,
					r: 40
				}
			]
		},
		{
			name: 'Break',
			series: [
				{
					name: 'Break',
					x: 'Break',
					y: 85,
					r: 40
				}
			]
		},
		{
			name: 'Flavour',
			series: [
				{
					name: 'Flavour',
					x: 'Flavour',
					y: 10,
					r: 40
				}
			]
		},
		{
			name: 'Aftertaste',
			series: [
				{
					name: 'Aftertaste',
					x: 'Aftertaste',
					y: 10,
					r: 40
				}
			]
		},
		{
			name: 'Acidity',
			series: [
				{
					name: 'Acidity',
					x: 'Acidity',
					y: 10,
					r: 40
				}
			]
		},
		{
			name: 'Body',
			series: [
				{
					name: 'Body',
					x: 'Body',
					y: 50,
					r: 40
				}
			]
		},
		{
			name: 'Balance',
			series: [
				{
					name: 'Balance',
					x: 'Balance',
					y: 10,
					r: 40
				}
			]
		},
		{
			name: 'Uniformirty',
			series: [
				{
					name: 'Uniformirty',
					x: 'Uniformirty',
					y: 10,
					r: 40
				}
			]
		},
		{
			name: 'Clean cup',
			series: [
				{
					name: 'Clean cup',
					x: 'Clean cup',
					y: 10,
					r: 40
				}
			]
		},
		{
			name: 'Sweetness',
			series: [
				{
					name: 'Sweetness',
					x: 'Sweetness',
					y: 10,
					r: 40
				}
			]
		},
		{
			name: 'Overall',
			series: [
				{
					name: 'Overall',
					x: 'Overall',
					y: 10,
					r: 40
				}
			]
		}
	];



	view: any[] = [750, 400];

	// options
	showXAxis: boolean = true;
	showYAxis: boolean = true;
	gradient: boolean = false;
	showLegend: boolean = true;
	minRadius: number = 5;
	yScaleMin: number = -3;
	yScaleMax: number = 10;
	colorScheme = {
		domain: ['#7c6be8']
	};


	//   viewScore: any[] = [844, 400];

	// options
	showXAxisScore: boolean = false;
	showYAxisScore: boolean = true;
	gradientScore: boolean = false;
	showLegendScore: boolean = true;
	minRadiusScore: number = 5;
	yScaleMinScore: number = 22;
	yScaleMaxScore: number = 100;
	colorSchemeScore = {
		domain: ['#f19634']
	};
	roaster_id: any;
	cupping_report_id: any;
	gc_order_id: any;
	evaluatorsList: any;
	evaluatorIdArray: any = [];
	evaluator_ids: any;
	singleCuppingDetails: any;
	avgScoreArray: any = [];
	avgScore: any;
	finalscores: any;
	sample_request_id: any;
	cuppingScoreDetailsArray: any = [];

	constructor(private modalService: BsModalService,
		public generateService: GenerateReportService, private userService: UserserviceService,
		private cookieService: CookieService, private toastrService: ToastrService,
		private router: Router, public roasterService: RoasterserviceService) {
		this.roaster_id = this.cookieService.get('roaster_id');
		this.type = true;
		this.cupping_report_id = this.generateService.cuppingDetails.cupping_report_id;
		if (this.generateService.fromQueryParam == 'ServiceRequest') {
			this.gc_order_id = this.generateService.cuppingDetails.gc_order_id;
		}
		else if (this.generateService.fromQueryParam == 'SampleRequest') {
			this.sample_request_id = this.generateService.cuppingDetails.external_sample_id;
		}
	}

	@ViewChild('confirmtemplate') private confirmtemplate: any;

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

	ngOnInit(): void {
		this.getEvaluators();

	}
	submit() {
		this.openModal(this.confirmtemplate);
	}

	getEvaluators() {
		this.roasterService.getEvaluatorsList(this.roaster_id, this.cupping_report_id).subscribe(
			res => {
				if (res['success'] == true) {
					this.evaluatorsList = res['result'];
					this.evaluatorsList.forEach(element => {
						this.evaluatorIdArray.push(element.evaluator_id);
					});
					console.log(this.evaluatorIdArray)
					this.getCuppingScore()
				}
				else {
					this.toastrService.error("Error while getting the evaluators list")
				}
			}
		)
	}

	formObject(itemKey, value) {
		let item = {};
		item['name'] = itemKey;
		item['x'] = itemKey;
		item['y'] = value;
		item['r'] = value;
		return item;
	}
	getCuppingScore() {
		this.evaluator_ids = this.evaluatorIdArray.toString();
		console.log(this.evaluator_ids)
		this.userService.getCuppingScore(this.roaster_id, this.cupping_report_id, this.evaluator_ids).subscribe(
			data => {
				if (data['success'] == true) {
					this.cuppingScoreDetailsArray = data['result'];
					console.log(this.cuppingScoreDetailsArray);
					let chartArray = [];
					let scoreArray = [];
					// this.cuppingScoreDetailsArray = this.cuppingScoreDetailsArray.concat(data['result']);
					this.cuppingScoreDetailsArray.forEach(ele => {
						this.avgScoreArray.push(ele['final_score']);
						let scoreObj = { 'name': ele['evaluator_name'] };
						scoreObj['series'] = [];
						let finalScoreObj = this.formObject('Final score', ele['final_score']);
						scoreObj['series'].push(finalScoreObj);
						scoreArray.push(scoreObj)

						let obj = { 'name': ele['evaluator_name'] };
						obj['series'] = [];
						ele['roast_level'] = ele['roast_level'];
						let aromaObj = this.formObject('Aroma', ele['roast_level']);
						let dryObj = this.formObject('Dry', ele['fragrance_dry']);
						let breakObj = this.formObject('Break', ele['fragrance_break']);
						let flavourObj = this.formObject('Flavour', ele['flavour_score']);
						let afterStateObj = this.formObject('After taste', ele['aftertaste_score']);
						let actidityObj = this.formObject('Acidity', ele['aftertaste_score']);
						let bodyObj = this.formObject('Body', ele['body_score']);
						let balanceObj = this.formObject('Balance', ele['balance_score']);
						let UniformityObj = this.formObject('Uniformity', ele['uniformity_score']);
						let cleancupObj = this.formObject('Clean cup', ele['cleancup_score']);
						let sweetnessObj = this.formObject('Sweetness', ele['sweetness_score']);
						let overallObj = this.formObject('Overall', ele['overall_score']);
						obj['series'].push(aromaObj);
						obj['series'].push(dryObj);
						obj['series'].push(breakObj);
						obj['series'].push(flavourObj);
						obj['series'].push(afterStateObj);
						obj['series'].push(actidityObj);
						obj['series'].push(bodyObj);
						obj['series'].push(balanceObj);
						obj['series'].push(UniformityObj);
						obj['series'].push(cleancupObj);
						obj['series'].push(sweetnessObj);
						obj['series'].push(overallObj);
						chartArray.push(obj);
					});

					console.log(chartArray);
					console.log(scoreArray)
					this.scoreData = scoreArray
					this.bubbleData = chartArray;
					this.finalscores = this.avgScoreArray.reduce((acc, cur) => acc + cur, 0);
					this.avgScore = this.finalscores / this.avgScoreArray.length;
				}
				else {
					this.toastrService.error("Error while getting the Cupping score details");
				}
			}
		)
	}

	reGrade() {
		if (this.generateService.fromQueryParam == 'ServiceRequest') {
			this.userService.recupSample(this.roaster_id, this.gc_order_id).subscribe(
				res => {
					if (res['success'] == true) {
						this.toastrService.success("Recupping has started");
						this.router.navigate(['/features/service-requests']);
						// this.next.emit('screen1');

					}
					else {
						this.toastrService.error('Error while downloading report');
					}
				}
			)
		}
		else {
			this.userService.recupSampleRequest(this.roaster_id, this.sample_request_id).subscribe(
				res => {
					if (res['success'] == true) {
						this.toastrService.success("Recupping has started");
						this.router.navigate(['/features/grade-sample']);
						// this.next.emit('screen1');

					}
					else {
						this.toastrService.error('Error while downloading report');
					}
				}
			)
		}
	}
	ngAfterViewInit() {
		this.singleCuppingData();
	}
	singleCuppingData() {
		if (this.cupping_report_id) {
			this.userService.getSingleCuppingDetails(this.roaster_id, this.cupping_report_id).subscribe(
				data => {
					if (data['success'] == true) {
						this.singleCuppingDetails = data['result'];

					}
					else {
						this.singleCuppingDetails = {}
						this.toastrService.error("Error while loading cupping details")
					}
				}
			)
		}
	}

	goNext() {
		if (this.singleCuppingDetails.status == "DRAFT") {
			if (this.generateService.cuppingDetails.type == "INVITED") {
				var data = {
					'evaluator_ids': this.evaluatorIdArray,
					'status': 'GENERATED'
				}
				this.userService.updateStatus(this.roaster_id, this.cupping_report_id, data).subscribe(
					res => {
						if (res['success'] == true) {
							this.toastrService.success('The Report has been updated.');
							this.router.navigate(['/features/service-requests']);

						}
						else {
							this.toastrService.error('Error while updating the report');
						}
					}
				)
			}
			else {
				var data = {
					'evaluator_ids': this.evaluatorIdArray,
					'status': 'GENERATED'
				}
				this.userService.updateStatus(this.roaster_id, this.cupping_report_id, data).subscribe(
					res => {
						if (res['success'] == true) {
							this.toastrService.success('The Report has been updated.');

						}
						else {
							this.toastrService.error('Error while updating the report');
						}
					}
				)

				this.next.emit('screen5');
			}
		} else {
			if (this.generateService.cuppingDetails.type == "INVITED") {
				this.router.navigate(['/features/service-requests']);
			}
			else {
				this.next.emit('screen5');
			}

		}


	}



}
