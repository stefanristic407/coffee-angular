import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login-security',
  templateUrl: './login-security.component.html',
  styleUrls: ['./login-security.component.css']
})
export class LoginSecurityComponent implements OnInit {
  passwordData:any;
  display: boolean = false;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,
    ) { }

    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);

    }
  ngOnInit(): void {
  }
  showDialog() {
    this.display = true;
}
}
