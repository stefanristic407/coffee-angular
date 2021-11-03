import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-manage-permission',
    templateUrl: './manage-permission.component.html',
    styleUrls: ['./manage-permission.component.scss'],
})
export class ManagePermissionComponent implements OnInit {
    @Input() permissionList: any = [];
    @Input() selectedPermission: any = [];
    @Output() selectedPermissionChange = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {}

    change() {
        this.selectedPermissionChange.emit(this.selectedPermission);
    }
}
