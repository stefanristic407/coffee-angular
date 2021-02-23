// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of  Orders List,Search and Filters.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/services/globals.service';
import { RoasteryProfileService } from '../../roastery-profile/roastery-profile.service';
@Component({
	selector: 'app-agreement',
	templateUrl: './agreement.component.html',
	styleUrls: ['./agreement.component.css']
})
export class AgreementComponent implements OnInit {
	appLanguage: any;
	// agreementsActive: any;
	searchTerm: any;
	customerType: string;
	// isHoreca = false;
	// isMicroRoaster = false;
	roasterId: string;
	mainData: any;

	constructor(public router: Router,
		public cookieService: CookieService,
		public roasterService: RoasterserviceService,
		public toastrService: ToastrService,
		public roasteryProfileService: RoasteryProfileService,
		public globals: GlobalsService) {
		this.roasterId = this.cookieService.get('roaster_id');
	}



	ngOnInit(): void {
		// Auth checking
		if (this.cookieService.get('Auth') === '') {
			this.router.navigate(['/auth/login']);
		}
		this.customerType = 'hrc';
		this.language();
	}

	language() {
		this.appLanguage = this.globals.languageJson;
		// this.agreementsActive++;
	}

	onNavChange(value: string): void {
		this.customerType = value;
	}
}
