import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgreementComponent } from './agreement/agreement.component';
import { SalesContractRoutingModule } from './sales-contract-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { RoasterAgreementsComponent } from './agreement/roaster-agreements/roaster-agreements.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AgreementComponent,
    RoasterAgreementsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SalesContractRoutingModule,
    Ng2SearchPipeModule,
  ]
})
export class SalesContractModule { }