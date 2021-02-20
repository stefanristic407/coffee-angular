import { Component, OnInit, TemplateRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GlobalsService } from 'src/services/globals.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SharedServiceService } from '@app/shared/services/shared-service.service';

@Component({
    selector: 'app-roasted-coffee-batches',
    templateUrl: './roasted-coffee-batches.component.html',
    styleUrls: ['./roasted-coffee-batches.component.css'],
})
export class RoastedCoffeeBatchesComponent implements OnInit {
    termRole: any;
    roles: any;
    role_id: any;
    termStatus: any;
    teamRole: any;
    showVar: boolean = true;
    showRole: boolean = true;
    term: any;
    odd: boolean = false;
    appLanguage?: any;

    mainData: any[] = [];
    roleData: string;
    roleID: string;
    roasterId: any;
    batchId: string | number | boolean;
    modalRef: BsModalRef;
    deleteBatchId: any;
    constructor(
        public router: Router,
        public cookieService: CookieService,
        private roasterService: RoasterserviceService,
        private toastrService: ToastrService,
        private userService: UserserviceService,
        private modalService: BsModalService,
        public globals: GlobalsService,
    ) {
        this.termStatus = '';
        this.termRole = '';
        this.roasterId = this.cookieService.get('roaster_id');
    }

    openDeleteModal(template1: TemplateRef<any>, deleteId: any) {
        this.modalRef = this.modalService.show(template1);
        this.deleteBatchId = deleteId;
    }

    ngOnInit(): void {
        this.roasterCoffeeBatchsData();
        this.appLanguage = this.globals.languageJson;
    }

    setTeamRole(term: any, roleId: any) {
        this.teamRole = term;
        this.role_id = roleId;
    }
    // Function Name : Status Filiter
    // Description: This function helps to filiter the users based on the selected status fiiter.

    setStatus(term: any) {
        this.termStatus = term;
        console.log(this.termStatus);
    }
    // Function Name : Roles Filiter
    // Description: This function helps to filiter the users based on the selected roles fiiter.

    setRole(term: any) {
        this.termRole = term;
    }
    toggleRole() {
        this.showRole = !this.showRole;
        if (this.showRole == false) {
            document.getElementById('role_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('role_id').style.border = '1px solid #d6d6d6';
        }
    }

    toggleStatus() {
        this.showVar = !this.showVar;
        if (this.showVar == false) {
            document.getElementById('status_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('status_id').style.border = '1px solid #d6d6d6';
        }
    }
    // Function Name : CheckAll
    // Description: This function helps to check all roles of the role list.
    checkAll(ev: any) {
        this.mainData.forEach((x) => (x.state = ev.target.checked));
    }

    // Function Name : IsAllchecked
    // Description: This function helps to check single role.
    isAllChecked() {
        return this.mainData.every((_) => _.state);
    }

    // Table data
    roasterCoffeeBatchsData() {
        this.roasterService.getRoasterCoffeeBatchs(this.roasterId).subscribe((data) => {
            if (data['success'] == true) {
                if (data['result'] == null || data['result'].length == 0) {
                    this.odd = true;
                    this.toastrService.error('Table Data is empty');
                } else {
                    this.odd = false;
                    this.mainData = data['result'];
                }
            } else {
                this.odd = true;
                this.toastrService.error('Error while getting the agreement list!');
            }
        });
    }

    redirectToEdit(item) {
        this.batchId = item.id;
        this.globals.selected_order_id = item.order_id;
        let navigationExtras: NavigationExtras = {
            queryParams: {
                batchId: encodeURIComponent(this.batchId),
            },
        };

        this.router.navigate(['/features/new-roasted-batch'], navigationExtras);
    }

    deleteRoastedBatch(deleteId: any) {
        this.roasterService.deleteRoastedCoffeeBatch(this.roasterId, deleteId).subscribe((data) => {
            if ((data['success'] = true)) {
                this.toastrService.success('Roasted Coffee Batch deleted successfully');
                this.roasterCoffeeBatchsData();
            } else {
                this.toastrService.error('Error while deletign the roasting profile');
            }
        });
    }
}
