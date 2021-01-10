import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { CuppingReportService } from '../cupping-report.service';
import { Router, NavigationExtras } from '@angular/router';
import { YourServicesService } from 'src/services/your-services/your-services.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { GenerateReportService } from '../../generate-report/generate-report.service';

@Component({
	selector: 'app-other-cupping-service',
	templateUrl: './other-cupping-service.component.html',
	styleUrls: ['./other-cupping-service.component.css']
})
export class OtherCuppingServiceComponent implements OnInit {

	type: boolean;

	public bubbleData = [
		{
			name: 'Data1',
			series: [
				{
					name: 'Aroma',
					x: 'Aroma',
					y: 6,
					r: 40
				},

				{
					name: 'Dry',
					x: 'Dry',
					y: -10,
					r: 40
				},


				{
					name: 'Break',
					x: 'Break',
					y: 2,
					r: 40
				},
				{

					name: 'Flavour',
					x: 'Flavour',
					y: 8,
					r: 40

				},
				{

					name: 'Aftertaste',
					x: 'Aftertaste',
					y: 7,
					r: 40

				},
				{

					name: 'Acidity',
					x: 'Acidity',
					y: -10,
					r: 40
				},

				{

					name: 'Body',
					x: 'Body',
					y: 6,
					r: 40

				},

				{
					name: 'Balance',
					x: 'Balance',
					y: 10,
					r: 40

				},
				{

					name: 'Uniformirty',
					x: 'Uniformirty',
					y: -10,
					r: 40

				},
				{

					name: 'Clean cup',
					x: 'Clean cup',
					y: -10,
					r: 40

				},
				{

					name: 'Sweetness',
					x: 'Sweetness',
					y: 10,
					r: 40

				},
				{

					name: 'Overall',
					x: 'Overall',
					y: -10,
					r: 40

				}
			]
		},
		{
			name: 'Data2',
			series: [
				{
					name: 'Aroma',
					x: 'Aroma',
					y: 4,
					r: 40
				},

				{
					name: 'Dry',
					x: 'Dry',
					y: 1,
					r: 40
				},


				{
					name: 'Break',
					x: 'Break',
					y: -10,
					r: 40
				},
				{

					name: 'Flavour',
					x: 'Flavour',
					y: 2,
					r: 40

				},
				{

					name: 'Aftertaste',
					x: 'Aftertaste',
					y: 8,
					r: 40

				},
				{

					name: 'Acidity',
					x: 'Acidity',
					y: -10,
					r: 40
				},

				{

					name: 'Body',
					x: 'Body',
					y: 6,
					r: 40

				},

				{
					name: 'Balance',
					x: 'Balance',
					y: 7,
					r: 40

				},
				{

					name: 'Uniformirty',
					x: 'Uniformirty',
					y: 10,
					r: 40

				},
				{

					name: 'Clean cup',
					x: 'Clean cup',
					y: 10,
					r: 40

				},
				{

					name: 'Sweetness',
					x: 'Sweetness',
					y: -10,
					r: 40

				},
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
			name: 'Data1',
			series: [
				{
					name: 'Aroma',
					x: 'Aroma',
					y: 10,
					r: 40
				},
				{

					name: 'Dry',
					x: 'Dry',
					y: 10,
					r: 40
				},
				{
					name: 'Break',
					x: 'Break',
					y: 85,
					r: 40
				},
				{
					name: 'Flavour',
					x: 'Flavour',
					y: 10,
					r: 40
				},
				{
					name: 'Aftertaste',
					x: 'Aftertaste',
					y: 10,
					r: 40
				},
				{

					name: 'Acidity',
					x: 'Acidity',
					y: 10,
					r: 40
				},
				{

					name: 'Body',
					x: 'Body',
					y: 10,
					r: 40

				},
				{

					name: 'Balance',
					x: 'Balance',
					y: 10,
					r: 40
				},
				{

					name: 'Uniformirty',
					x: 'Uniformirty',
					y: 10,
					r: 40
				},

				{

					name: 'Clean cup',
					x: 'Clean cup',
					y: 10,
					r: 40
				},

				{
					name: 'Sweetness',
					x: 'Sweetness',
					y: 10,
					r: 40
				},

				{

					name: 'Overall',
					x: 'Overall',
					y: 10,
					r: 40
				}
			]
		},
		{
			name: 'Data2',
			series: [
				{
					name: 'Aroma',
					x: 'Aroma',
					y: 10,
					r: 40
				},
				{

					name: 'Dry',
					x: 'Dry',
					y: 10,
					r: 40
				},
				{
					name: 'Break',
					x: 'Break',
					y: 76,
					r: 40
				},
				{
					name: 'Flavour',
					x: 'Flavour',
					y: 10,
					r: 40
				},
				{
					name: 'Aftertaste',
					x: 'Aftertaste',
					y: 10,
					r: 40
				},
				{

					name: 'Acidity',
					x: 'Acidity',
					y: 10,
					r: 40
				},
				{

					name: 'Body',
					x: 'Body',
					y: 10,
					r: 40

				},
				{

					name: 'Balance',
					x: 'Balance',
					y: 10,
					r: 40
				},
				{

					name: 'Uniformirty',
					x: 'Uniformirty',
					y: 10,
					r: 40
				},

				{

					name: 'Clean cup',
					x: 'Clean cup',
					y: 10,
					r: 40
				},

				{
					name: 'Sweetness',
					x: 'Sweetness',
					y: 10,
					r: 40
				},

				{

					name: 'Overall',
					x: 'Overall',
					y: 10,
					r: 40
				}
			]
		}
	];


	view: any[] = [825, 400];

	// options
	showXAxis: boolean = true;
	showYAxis: boolean = true;
	gradient: boolean = false;
	showLegend: boolean = true;
	minRadius: number = 5;
	yScaleMin: number = -3;
	yScaleMax: number = 10;
	colorScheme = {
		domain: ['#7c6be8', '#f19634']
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
		domain: ['#7c6be8', '#f19634']
	};
	appLanguage: any;
	mainData: any;
	eachServiceData: any;
	fc_id: any;
	cupping_report_id: any;
	evaluatorsListArray: any = [];
	evaluatorData: any;
	evaluatorName: any;
	cupping_score_details: any;
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
	defectsList: any;
	totalColors: any;
	harvest_id: any;
	dryprocess: any;
	drydescription: any;
	drying_period: any;
	screen_size: any;
	density: any;
	no_of_defects: any;
	preparation: any;
	quality_grade: any;
	moisture_content_process: any;
	water_activity_process: any;
	wetprocess: any;
	wetdescription: any;
	fermentation: any;
	parchment_weight: any;
	singleCuppingDetails: any;
	single_status: any;
	completed_on: any;
	sample_id: any;
	evaluatorIdArray: any = [];
	cuppingScoreDetailsArray: any = [];
	avgScoreArray: any = [];
	avgScore: any;
	finalscores: any;
	evalList: any = [];


	constructor(public globals: GlobalsService, public cuppingService: CuppingReportService, private router: Router,
		public yourService: YourServicesService, private roasterService: RoasterserviceService, private cookieService: CookieService,
		private userService: UserserviceService, private toastrService: ToastrService, public generateReportService: GenerateReportService) {
		this.type = true;
		this.fc_id = this.cookieService.get('roaster_id');
		this.ViewCuppingInviteList();
		this.getCuppingScoreDetails();
		this.evaluatorsList();
		// this.viewProcessDetails();
		this.getCuppingScoreDetails();
		this.physicalDefectsList();
		this.singleCuppingData();
	}

	ngOnInit(): void {
	}
	ViewCuppingInviteList() {
		this.roasterService.listCuppingRequest(this.fc_id).subscribe(res => {
			this.mainData = res['success'] ? res['result'] : [];
			if (this.cuppingService.otherReportDetails) {
				let eachServiceValue = this.mainData.filter(ele => ele.cupping_report_id == this.cuppingService.otherReportDetails['cupping_report_id']);
				this.eachServiceData = eachServiceValue[0];
			}
		});
	}
	evaluatorsList() {
		if (this.cuppingService.otherReportDetails) {
			this.cupping_report_id = this.cuppingService.otherReportDetails.cupping_report_id;
			this.roasterService.getEvaluatorsList(this.fc_id, this.cupping_report_id).subscribe(
				response => {
					if (response['success'] == true) {
						this.evalList = response['result'];
						response['result'].forEach(element => {
							this.evaluatorIdArray.push(element.evaluator_id)

						});
						this.evaluatorData = response['result'].filter(ele => ele.is_primary == true);
						this.evaluatorName = this.evaluatorData[0].evaluator_name;
						this.evaluatorsListArray = response['result'].filter(ele => ele.is_primary != true);
					}
				}
			)
		}
	}
	formObject(itemKey, value) {
		let item = {};
		item['name'] = itemKey;
		item['x'] = itemKey;
		item['y'] = value;
		item['r'] = value;
		return item;
	}
	getCuppingScoreDetails() {
		if (this.cuppingService.otherReportDetails) {
			this.cupping_report_id = this.cuppingService.otherReportDetails.cupping_report_id;
			this.userService.getCuppingScore(this.fc_id, this.cupping_report_id, this.evaluatorIdArray).subscribe(
				res => {
					if (res['success'] == true) {
						this.cupping_score_details = res['result'];
						this.cupping_score_details.forEach(element => {
							let descriptorArray = element.descriptors.split(',');
							element['descriptorArray'] = descriptorArray;
						});
						this.cuppingScoreDetailsArray = res['result'];
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
							scoreArray.push(scoreObj);

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
				})
		}
	}
	physicalDefectsList() {
		if (this.cuppingService.otherReportDetails) {
			this.cupping_report_id = this.cuppingService.otherReportDetails.cupping_report_id;
			this.userService.getPhysicalDefectsList(this.fc_id, this.cupping_report_id).subscribe(
				res => {
					if (res['success'] == true) {
						this.defectsList = res['result'];
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
						this.totalColors = this.defectsList.colors;
						this.total_defects = this.defectsList.total_green_defects;
						this.moisture_content = this.defectsList.moisture_content;
					}
					else {
						this.toastrService.error("Error while getting physical defects");
					}
				}
			)
		}
	}

	singleCuppingData() {
		if (this.cuppingService.otherReportDetails) {
			this.cupping_report_id = this.cuppingService.otherReportDetails.cupping_report_id;
			this.userService.getSingleCuppingDetails(this.fc_id, this.cupping_report_id).subscribe(
				data => {
					if (data['success'] == true) {
						this.singleCuppingDetails = data['result'];
						this.single_status = this.singleCuppingDetails.status;
						this.completed_on = this.singleCuppingDetails.completed_on;
					}
					else {
						this.singleCuppingDetails = {};
						this.toastrService.error("Error while loading cupping details");
					}
				}
			)
		}
	}
	OtherRecupSample() {
		this.sample_id = this.cuppingService.otherReportDetails.external_sample_id;
		this.userService.externalRecupSample(this.fc_id, this.sample_id).subscribe(
			res => {
				if (res['success'] == true) {
					this.toastrService.success("External cupping report added");
					// this.router.navigate(['/features/generate-report']);
				}
				else {
					this.toastrService.error('Error while recup external sample');
				}
			}
		)
	}
}
