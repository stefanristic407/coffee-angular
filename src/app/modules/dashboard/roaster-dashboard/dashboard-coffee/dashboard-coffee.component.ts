import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalsService } from '@services';
import { MDashboardService } from '../m-dashboard.service';

@Component({
    selector: 'app-dashboard-coffee',
    templateUrl: './dashboard-coffee.component.html',
    styleUrls: ['./dashboard-coffee.component.scss'],
})
export class DashboardCoffeeComponent implements OnInit, OnDestroy {
    stock: any;
    stockSub: Subscription;
    orders: any[] = [];
    ordersSub: Subscription;
    public chartData: any[] = [];
    orderTypes = {
        GC_ORDER: {
            color: '#629b20',
            name: 'Booked',
        },
        GC_ORDER_SAMPLE: {
            color: '#f19634',
            name: 'Sample',
        },
        PREBOOK_LOT: {
            color: '#8872ef',
            name: 'Prebook',
        },
    };
    constructor(private router: Router, public globals: GlobalsService, private mDashboardSrv: MDashboardService) {}

    ngOnInit(): void {
        this.stockSub = this.mDashboardSrv.stock$.subscribe((res: any) => {
            if (res) {
                this.stock = res;
                this.makeChartData();
            }
        });
        this.ordersSub = this.mDashboardSrv.orders$.subscribe((res: any) => {
            if (res) {
                const orderData: any = res;
                const sortedOrdersData = orderData.sort((a: any, b: any) => {
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                });
                sortedOrdersData.length > 5
                    ? (this.orders = sortedOrdersData.slice(0, 5))
                    : (this.orders = sortedOrdersData);
            }
        });
    }

    ngOnDestroy() {
        this.stockSub.unsubscribe();
        this.ordersSub.unsubscribe();
    }

    makeChartData() {
        const tempData = [];
        this.stock.stock_stats.forEach((element) => {
            tempData.push({
                name: 'Cup score: ' + element.cup_score,
                value: element.available_quantity.toFixed(1),
            });
        });
        const chartSortData = tempData.sort((a, b) => a.available_quantity - b.available_quantity);
        chartSortData.length > 5 ? (this.chartData = chartSortData.slice(0, 5)) : (this.chartData = chartSortData);
    }

    goToOrderDetails(item: any) {
        this.router.navigateByUrl(`/orders/es/${item.id}`);
    }
}
