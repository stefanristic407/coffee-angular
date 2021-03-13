import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { GenerateReportService } from '../generate-report.service';

@Component({
    selector: 'app-estate-info',
    templateUrl: './estate-info.component.html',
    styleUrls: ['./estate-info.component.scss'],
})
export class EstateInfoComponent implements OnInit {
    @Output() showDetail = new EventEmitter<any>();
    @Input() cuppingDetails;
    @Input() singleCuppingDetails;
    @Input() evaluatorsListArray;
    @Input() evaluatorName;
    @Input() status;
    @Input() completedOn;

    constructor(public generateReportService: GenerateReportService) {}

    ngOnInit(): void {}

    routeToProcessDet() {
        this.showDetail.emit();
    }
}
