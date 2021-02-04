import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
    selector: 'app-manage-permission',
    templateUrl: './manage-permission.component.html',
    styleUrls: ['./manage-permission.component.scss'],
})
export class ManagePermissionComponent implements OnInit {
    @Input() permissionList: any = [];
    @Input() selectedPermission: any = [];
    constructor(public globals: GlobalsService) {}

    ngOnInit(): void {}
}
