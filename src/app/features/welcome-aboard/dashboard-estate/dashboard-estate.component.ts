import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/services/globals.service';
import { UserserviceService } from 'src/services/users/userservice.service';

@Component({
  selector: 'app-dashboard-estate',
  templateUrl: './dashboard-estate.component.html',
  styleUrls: ['./dashboard-estate.component.scss'],
})
export class DashboardEstateComponent implements OnInit {
  public tooltip: any = {
    enable: true,
    format: '${point.x} : <b>${point.y}t</b>',
  };
  public chartData: any[] = [];
  public legendSettings: any = {
    visible: true,
    position: 'Bottom',
  };
  public dataLabel: any = {
    visible: true,
    position: 'Outside',
    connectorStyle: { length: '10%' },
    name: 'text',
    font: { size: '14px' },
  };

  roasterId: string;
  estateData: any;
  sourcing: any;

  constructor(
    private cookieService: CookieService,
    public globals: GlobalsService,
    private userSrv: UserserviceService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.roasterId = this.cookieService.get('roaster_id');
    this.getStats();
    this.getAvailableEstates();
  }

  getAvailableEstates() {
    this.userSrv.getAvailableEstates(this.roasterId).subscribe((res: any) => {
      if (res.success) {
        this.estateData = res.result;
        console.log('estate data:', this.estateData);
      } else {
        this.toastrService.error('Error while getting estates');
      }
    });
  }

  getStats() {
    this.userSrv.getStats(this.roasterId).subscribe((res: any) => {
      if (res.success) {
        this.sourcing = res.result.sourcing;
        this.makeChartData();
        console.log('sourcing:', this.sourcing);
      } else {
        this.toastrService.error('Error while getting stats');
      }
    });
  }

  makeChartData() {
    const tempData = [];
    this.sourcing.sourcing_stats.forEach((element) => {
      tempData.push({
        x: element.origin,
        y: (element.available_quantity / 1000).toFixed(0),
        text: `${element.origin}: ${(element.available_quantity / 1000).toFixed(0)}t`,
      });
    });
    this.chartData = tempData;
  }
}
