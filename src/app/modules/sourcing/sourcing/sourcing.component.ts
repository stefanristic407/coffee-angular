import { Component, OnInit, TemplateRef, Renderer2 } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { UserserviceService } from '@services';
import { SourcingService } from '../sourcing.service';
declare var $: any;

@Component({
    selector: 'app-sourcing',
    templateUrl: './sourcing.component.html',
    styleUrls: ['./sourcing.component.scss'],
})
export class SourcingComponent implements OnInit {
    showGrade: boolean = true;
    showCrop: boolean = true;
    showSort: boolean = true;
    showWeight: boolean = true;
    modalRef: BsModalRef;
    variety: any;
    appLanguage?: any;
    sourcingActive: any = 0;
    filterGrade: '';
    filterOrigin: any = [];
    filterVariety: any = [];
    filterWeight: '';
    filterSearch: '';
    showOrigin: boolean = true;
    showVariety: boolean = true;

    activeTab = this.sourcingSrv.currentView;
    roasterId: any;
    estateData: any;
    countryValue: any;
    monthName: any;
    listData: any;
    backValue: boolean;
    flavourName: any;
    harvestData: any;
    certiImage: any;
    certificate: any;
    harvestCertify: any;
    estateValue: any;
    showCoffee: boolean = true;
    filterCoffee: any = null;

    menuItems: any[];
    gradeItems: any[] = [
        { label: 'All', value: null },
        { label: '81.0 - 83.0', value: '81.0,83.0' },
        { label: '84.0 - 86.0', value: '84.0,86.0' },
        { label: '87.0 - 89.0', value: '87.0,89.0' },
        { label: '90+', value: '90' },
    ];

    queryParams: any = {
        origin: '',
        variety: '',
        name: '',
        grade: '',
        crop_year: '',
        weight: 'kg',
        sort: '',
    };

    constructor(
        private modalService: BsModalService,
        private router: Router,
        public globals: GlobalsService,
        private userService: UserserviceService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
        public sourcingSrv: SourcingService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    ngOnInit(): void {
        this.menuItems = [
            { label: this.globals.languageJson?.estates, routerLink: ['/sourcing/estate-list'] },
            {
                label: this.globals.languageJson?.available_green_coffee,
                routerLink: ['/sourcing/coffee-list'],
            },
        ];

        this.appLanguage = this.globals.languageJson;

        // Toggle Esstate active
        $('.btn-switch').click(function () {
            const $group = $(this).closest('.cardpanel-detail');
            $('.btn-switch', $group).removeClass('active');
            $(this).addClass('active');
        });
        $('.activate-toggle').click(function () {
            $('.cardpanel-detail').fadeIn();
            $('.table-details').fadeOut();
            $('.remove-toggle').removeClass('active');
            // $(".cardpanel-detail").addClass('active')
        });
        $('.remove-toggle').click(function () {
            $('.table-details').fadeIn();
            $('.cardpanel-detail').fadeOut();
            $('.activate-toggle').removeClass('active');
        });
    }

    search(activeTab) {
        this.activeTab = activeTab;
        this.sourcingSrv.currentView = activeTab;
    }

    result(activeTab) {
        this.activeTab = activeTab;
        this.sourcingSrv.currentView = activeTab;
    }
    setName(data: any) {
        this.queryParams.name = data;
        this.filterCall();
    }
    setGrade(data: any) {
        this.queryParams.grade = data;
        this.filterCall();
    }
    setCrop(cropdata: any) {
        this.queryParams.crop_year = cropdata;
        this.filterCall();
    }
    setSort(sortdata: any) {
        this.queryParams.sort = sortdata;
        this.filterCall();
    }
    setWeight(weightdata: any) {
        this.queryParams.weight = weightdata;
        this.filterCall();
    }

    selectVariety(event, value) {
        if (event.target.checked) {
            if (!this.filterVariety.includes(value)) {
                this.filterVariety.push(value);
            }
        } else {
            if (this.filterVariety.includes(value)) {
                const index = this.filterVariety.indexOf(value);
                this.filterVariety.splice(index, 1);
            }
        }
    }

    selectOrigin(event, value) {
        console.log(event);
        if (event.target.checked) {
            if (!this.filterOrigin.includes(value)) {
                this.filterOrigin.push(value);
            }
        } else {
            if (this.filterOrigin.includes(value)) {
                const index = this.filterOrigin.indexOf(value);
                this.filterOrigin.splice(index, 1);
            }
        }
    }

    setFilterValue(name: any, value: any) {
        let filterValue = [];
        switch (name) {
            case 'grade':
                this.filterGrade = value;
                break;
            case 'weight':
                this.filterWeight = value;
                break;
            case 'crop':
                this.queryParams.crop = value;
                break;
        }
        this.filterCall();
    }

    clearFilter() {
        this.filterOrigin = [];
        this.filterVariety = [];
        this.filterCall();
    }

    filterCall() {
        this.queryParams.origin = this.filterOrigin.join(',');
        this.queryParams.origin = this.filterOrigin.join(',');
        this.sourcingSrv.queryParams.next(this.queryParams);
    }

    getFlavourName(flavourid: any) {
        if (this.sourcingSrv.flavourList) {
            this.flavourName = this.sourcingSrv.flavourList.find((flavour) => flavour.id == flavourid).name;
            return this.flavourName;
        }
    }

    getUniqueVarities(lots) {
        const varities = [];
        if (lots && lots.length) {
            lots.forEach((ele) => {
                if (ele.variety) {
                    varities.push(ele.variety);
                }
            });
            const unique = varities.filter((v, i, a) => a.indexOf(v) === i);
            return unique.join(', ');
        } else {
            return 'NA';
        }
    }
    toggleGrade() {
        this.showGrade = !this.showGrade;
        if (this.showGrade == false) {
            document.getElementById('grade_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('grade_id').style.border = '1px solid #d6d6d6';
        }
    }
    toggleCrop() {
        this.showCrop = !this.showCrop;
        if (this.showCrop == false) {
            document.getElementById('crop_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('crop_id').style.border = '1px solid #d6d6d6';
        }
    }
    toggleCoffee() {
        this.showCoffee = !this.showCoffee;
        if (this.showCoffee == false) {
            document.getElementById('coffee_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('coffee_id').style.border = '1px solid #d6d6d6';
        }
    }
    toggleSort() {
        this.showSort = !this.showSort;
        if (this.showSort == false) {
            document.getElementById('sort_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('sort_id').style.border = '1px solid #d6d6d6';
        }
    }
    toggleWeight() {
        this.showWeight = !this.showWeight;
        if (this.showWeight == false) {
            document.getElementById('weight_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('weight_id').style.border = '1px solid #d6d6d6';
        }
    }
    toggleOrigin() {
        this.showOrigin = !this.showOrigin;
        if (this.showOrigin == false) {
            document.getElementById('origin_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('origin_id').style.border = 'initial';
            document.getElementById('origin_id').style.borderRight = '1px solid #d6d6d6';
        }
    }
    toggleVariety() {
        this.showVariety = !this.showVariety;
        if (this.showVariety == false) {
            document.getElementById('variety_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('variety_id').style.border = 'initial';
            document.getElementById('variety_id').style.borderRight = '1px solid #d6d6d6';
        }
    }

    GetMonthName(month: number) {
        switch (month) {
            case 1:
                this.monthName = 'Jan';
                break;
            case 2:
                this.monthName = 'Feb';
                break;

            case 3:
                this.monthName = 'Mar';
                break;

            case 4:
                this.monthName = 'Apr';
                break;
            case 5:
                this.monthName = 'May';
                break;
            case 6:
                this.monthName = 'Jun';
                break;
            case 7:
                this.monthName = 'Jul';
                break;
            case 8:
                this.monthName = 'Aug';
                break;
            case 9:
                this.monthName = 'Sept';
                break;
            case 10:
                this.monthName = 'Oct';
                break;
            case 11:
                this.monthName = 'Nov';
                break;
            case 12:
                this.monthName = 'Dec';
                break;
            default:
                this.monthName = '';
                break;
        }
        return this.monthName;
    }
}
