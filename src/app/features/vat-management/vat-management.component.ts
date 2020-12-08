import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VatserviceService } from './vatservice.service';

@Component({
  selector: 'app-vat-management',
  templateUrl: './vat-management.component.html',
  styleUrls: ['./vat-management.component.css']
})
export class VatManagementComponent implements OnInit {

  constructor(private router : Router, 
    private toastrService: ToastrService,
    public vatService:VatserviceService) { }

  ngOnInit(): void {
  }

}
