import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/services/users/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationExtras } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { GenerateReportService } from '../generate-report/generate-report.service';
import { RoasteryProfileService } from '../../roastery-profile/roastery-profile.service';

@Component({
	selector: 'app-grade-sample',
	templateUrl: './grade-sample.component.html',
	styleUrls: ['./grade-sample.component.css']
})
export class GradeSampleComponent implements OnInit {
	roaster_id: any;
	grade_origin: any = "";
	grade_estate: any;
	grade_species: any;
	grade_id: any;
	cuppingRequestList: any;
	editTableRow: boolean = false;
	listTableRow: boolean = true;
	eachId: any;
	eachEstateName: any;
	eachOrigin: any;
	eachSpecies: string;
	eachSampleId: any;
	updateVatmode: boolean = false;
	count: any;

	constructor(private userService: UserserviceService,
		private toasterService: ToastrService, private router: Router,
		public globals: GlobalsService, private cookieService: CookieService, public roasterService: RoasterserviceService,
		public generateReportService: GenerateReportService, public roasteryProfileService: RoasteryProfileService) {
		this.roaster_id = this.cookieService.get('roaster_id');
	}

	ngOnInit(): void {
		this.getExternalReports();
	}
	addExternalReport() {

		if (this.grade_origin === undefined || this.grade_species === undefined || this.grade_estate === undefined || this.grade_id === undefined) {
			this.toasterService.error("Fields should not be empty.");
		}
		else {
			var data = {
				"origin": this.grade_origin,
				"estate_name": this.grade_estate,
				"species": this.grade_species,
				"sample_id": this.grade_id
			}
			this.userService.addExternalCuppingReport(this.roaster_id, data).subscribe(
				res => {
					if (res['success'] == true) {
						this.toasterService.success('External cupping report added successfully.');
						// this.router.navigate(['/features/grade-service']);
						this.getExternalReports();
						this.grade_origin = '';
						this.grade_estate = '';
						this.grade_species = '';
						this.grade_id = '';
					}
					else {
						this.toasterService.error("Error while adding reports.")
					}
				}
			)
		}
	}

	getExternalReports() {
		this.userService.listCuppingRequest(this.roaster_id).subscribe(
			data => {
				this.cuppingRequestList = data['result'];
			}
		)
	}

	editSampleReport(data: any) {
		this.editTableRow = true;
		this.listTableRow = false;
		this.eachId = data.cupping_report_id;
		this.eachEstateName = data.estate_name;
		this.eachOrigin = data.origin;
		this.eachSpecies = "Bourbon";
		this.eachSampleId = data.external_sample_id;
	}
	saveExternalSample(editId: any) {
		console.log(editId);
		var updateSample = {
			"origin": this.eachOrigin,
			"estate_name": this.eachEstateName,
			"species": this.eachSpecies,
			"sample_id": this.eachSampleId
		}
		this.roasterService.updateExternalSample(this.roaster_id, editId, updateSample).subscribe(
			result => {
				if (result['success'] == true) {
					this.toasterService.success("Sample Details updated successfully");
					this.getExternalReports();
					this.editTableRow = false;
					this.listTableRow = true;
					this.updateVatmode = true;
				}
				else {
					this.toasterService.error("Error while updating Sample details");
				}
			}
		);
	}
	deleteSample(delId: any) {
		console.log(delId);
		this.roasterService.deleteExternalSample(this.roaster_id, delId).subscribe(
			result => {
				if (result['success'] == true) {
					this.toasterService.success("Sample deleted successfully");
					setTimeout(() => {
						this.getExternalReports();
					}, 2000)
				}
				else {
					this.toasterService.error("Error while deleting VAT details");
				}
			}
		);
	}
	selectedRow() {
		let getItem = this.cuppingRequestList.filter(ele => ele['state'] == true);
		this.count = getItem ? getItem.length : 0;

	}

	generateReportLink() {
		let getItem = this.cuppingRequestList.filter(ele => ele['state'] == true);

		if (getItem) {
			this.generateReportService.serviceRequestsList = getItem;
			this.generateReportService.cuppingDetails = getItem[0];
			let navigationExtras: NavigationExtras = {
				queryParams: {
					"from": 'SampleRequest',
				}
			}

			this.router.navigate(['/features/generate-report'], navigationExtras);
		}

	}
	changeCountry() {
		// console.log("the selected country is : " + this.country);
		this.roasteryProfileService.changeCountry(this.roasteryProfileService.country);
	}
}
