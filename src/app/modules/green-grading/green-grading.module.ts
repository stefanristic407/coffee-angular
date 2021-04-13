import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { GreenGradingRoutingModule } from './green-grading-routing.module';

import { GreenGradingComponent } from './green-grading.component';
import { CategoryViewComponent } from './category-view/category-view.component';

import { CuppingReportComponent } from './cupping-report/cupping-report.component';
import { GenerateNewReportComponent } from './cupping-report/generate-new-report/generate-new-report.component';
import { CuppingServiceComponent } from './cupping-report/cupping-service/cupping-service.component';

import { GenerateReportComponent } from './generate-report/generate-report.component';
import { EstateInfoComponent } from './generate-report/estate-info/estate-info.component';
import { GenerateCoffeeGradingComponent } from './generate-report/generate-coffee-grading/generate-coffee-grading.component';
import { GenerateCuppingReportComponent } from './generate-report/generate-cupping-report/generate-cupping-report.component';
import { GenerateCuppingResultsComponent } from './generate-report/generate-cupping-results/generate-cupping-results.component';
import { GenerateGreenCoffeeComponent } from './generate-report/generate-green-coffee/generate-green-coffee.component';
import { GenerateMySampleComponent } from './generate-report/generate-my-sample/generate-my-sample.component';

import { GradeSampleComponent } from './grade-sample/grade-sample.component';
import { ProcessDetailsComponent } from './process-details/process-details.component';
import { ResultViewComponent } from './result-view/result-view.component';
import { GreenCoffeeOrdersComponent } from './green-coffee-orders/green-coffee-orders.component';
import { AssignUserComponent } from './assign-user/assign-user.component';
import { AssignOrdersComponent } from './assign-orders/assign-orders.component';

@NgModule({
    declarations: [
        GreenGradingComponent,
        GenerateReportComponent,
        GradeSampleComponent,
        CuppingReportComponent,
        ProcessDetailsComponent,
        GenerateNewReportComponent,
        CuppingServiceComponent,
        GenerateCoffeeGradingComponent,
        GenerateGreenCoffeeComponent,
        GenerateMySampleComponent,
        GenerateCuppingResultsComponent,
        CategoryViewComponent,
        EstateInfoComponent,
        GenerateCuppingReportComponent,
        ResultViewComponent,
        GreenCoffeeOrdersComponent,
        AssignUserComponent,
        AssignOrdersComponent,
    ],
    imports: [CommonModule, FormsModule, GreenGradingRoutingModule, SharedModule],
})
export class GreenGradingModule {}
