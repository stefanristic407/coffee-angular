import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserserviceService } from '@services';
import { RoasterserviceService } from '@services';
import { SourcingService } from '../sourcing.service';
declare var $: any;

@Component({
    selector: 'app-estate-details',
    templateUrl: './estate-details.component.html',
    styleUrls: ['./estate-details.component.scss'],
})
export class EstateDetailsComponent implements OnInit, AfterViewInit {
    appLanguage?: any;
    estateDetailsActive: any = 0;
    brandProfileEstateWeb = 'https://qa-brand-profile.sewnstaging.com/estatebrandprofile/green-coffee';
    estateProfile = 'https://qa-estates-portal.sewnstaging.com/features/estate-profile';

    modalRef: BsModalRef;
    public coffeedata: any[] = [
        {
            estatename: 'Finca La Pampa',
            name: 'Organic washed Micro-lot',
            origin: 'Colombia',
            species: 'Bourbon',
            price: '$7.4 USD / kg',
            quantity: '287 bags',
            image: '/assets/images/sourcing-image1.jpg',
            score: '84.5',
        },
        {
            estatename: 'Gesha',
            name: 'Blend washed',
            origin: 'Colombia',
            species: 'Bourbon',
            price: '$5.53USD / kg',
            quantity: '297 bags',
            image: '/assets/images/sourcing-image3.jpg',
            score: '88.0',
        },
        {
            estatename: 'Finca La Toboba',
            name: 'FTO blend',
            origin: 'Ethopia',
            species: 'Bourbon',
            price: '$8.92 USD /kg',
            quantity: '567 bags',
            image: '/assets/images/sourcing-image7.jpg',
            score: '81.5',
        },
    ];
    roaster_id: string;
    blogResult: string;
    countryValue: any;
    flavourName: any;
    certiImage: any;
    estateData: any;
    estateCetificateData: any;
    certifyEstate: any;
    galleryImages: any;
    constructor(
        private modalService: BsModalService,
        public globals: GlobalsService,
        private route: ActivatedRoute,
        public sourcing: SourcingService,
        public cookieService: CookieService,
        private userService: UserserviceService,
        private roasterService: RoasterserviceService,
    ) {
        this.route.params.subscribe((params) => {
            this.sourcing.estateId = params['id'];
            //   this.certifyEstate =JSON.parse(params['certificate']);
            this.sourcing.estateDetailList();
            this.sourcing.lotsList();
            this.sourcing.flavourprofileList();
            this.sourcing.greenCoffee();
            this.sourcing.estateEmployees();
            this.getEachEstateCertify();
            this.estateGalleryFiles();
            this.sourcing.getEstateReviews();
            this.sourcing.getEstateSummary();
            // this.getAvailableEstates();
            // this.sourcing.certificateList();
        });
        this.roaster_id = this.cookieService.get('roaster_id');
    }
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
    ngOnInit(): void {
        this.language();
        this.blogResult = decodeURIComponent(this.route.snapshot.queryParams['dataLots']);
    }
    ngAfterViewInit() {
        if (this.blogResult == 'true') {
            $('#nav-profile-tab3')[0].click();
        }
    }

    language() {
        this.appLanguage = this.globals.languageJson;
        this.estateDetailsActive++;
    }

    GetCountry(data: any) {
        return this.globals.getCountryName(data.toUpperCase());
    }

    getFlavourName(flavourid: any) {
        if (this.sourcing.flavourList) {
            this.flavourName = this.sourcing.flavourList.find((flavour) => flavour.id == flavourid).name;
            return this.flavourName;
        }
    }

    getEachEstateCertify() {
        this.userService.getEachEsateCertificates(this.sourcing.estateId).subscribe((res: any) => {
            // console.log(res);
            if (res.success) {
                this.certifyEstate = res.result;
                this.sourcing.overviewCertify = this.certifyEstate;
                // console.log(this.certifyEstate);
            }
        });
    }
    getCertificateData(data: any) {
        //   console.log(data);
        if (data.certificate_type_id > 0) {
            this.certiImage = this.sourcing.finalCertify.filter((certify) => certify.id == data.certificate_type_id);
            // console.log(this.certiImage);
            if (this.certiImage !== '') {
                return this.certiImage[0].image_url;
            }
        }
    }
    // getAvailableEstates(){
    // 	alert(this.sourcing.detailList);
    // 	this.userService.getAvailableEstates(this.roaster_id).subscribe(
    // 	  data => {
    // 		if(data['success'] == true){
    // 		//   console.log(data['result']);
    // 		  this.estateCetificateData = data['result'];

    // 		  for(var i=0;i<this.estateCetificateData.length;i++){
    // 			  console.log(this.estateCetificateData[i].estate_id==this.sourcing.detailList);
    // 				if(this.estateCetificateData[i].estate_id==this.sourcing.detailList)
    // 				{
    // 					this.certifyEstate=this.estateCetificateData[i].certificates;
    // 				}
    // 				console.log("certify"+this.certifyEstate);
    // 		  }
    // 		}
    // 	  }
    // 	)
    //   }

    brandProfileSite() {
        const redirectUrl = this.brandProfileEstateWeb;
        this.roasterService.navigate(redirectUrl, true);
    }

    estateProfileSite() {
        const redirectUrl = this.estateProfile;
        this.roasterService.navigate(redirectUrl, true);
    }
    estateGalleryFiles() {
        this.userService.getEstateGallery(this.sourcing.estateId).subscribe((res: any) => {
            if (res.success) {
                this.galleryImages = res.result;
            }
        });
    }
}
