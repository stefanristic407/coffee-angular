import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourcingRoutingModule } from './sourcing-routing.module';
import { SharedModule } from '@shared';

import { AgmCoreModule } from '@agm/core';

import { CertificateImgPipe } from './certificateImg.pipe';

import { SourcingComponent } from './sourcing/sourcing.component';
import { EstateListComponent } from './estate-list/estate-list.component';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';
import { CoffeeDetailsComponent } from './coffee-details/coffee-details.component';
import { AvailableConfirmOrderComponent } from './coffee-details/available-confirm-order/available-confirm-order.component';
import { EstateDetailsComponent } from './estate-details/estate-details.component';
import { SourcingOrderChatComponent } from './estate-details/sourcing-order-chat/sourcing-order-chat.component';
import { OverviewRatingsComponent } from './estate-details/overview-ratings/overview-ratings.component';
import { LandLotsComponent } from './estate-details/land-lots/land-lots.component';
import { OverviewComponent } from './estate-details/overview/overview.component';
import { AboutComponent } from './estate-details/about/about.component';
import { EstateCardComponent } from './estate-card/estate-card.component';
import { HarvestCardComponent } from './harvest-card/harvest-card.component';
import { GreenCoffeeComponent } from './estate-details/green-coffee/green-coffee.component';
import { GallaryComponent } from './estate-details/gallary/gallary.component';
import { WhyUsComponent } from './estate-details/why-us/why-us.component';

@NgModule({
    declarations: [
        CertificateImgPipe,
        SourcingComponent,
        EstateListComponent,
        CoffeeListComponent,
        CoffeeDetailsComponent,
        AvailableConfirmOrderComponent,
        EstateDetailsComponent,
        SourcingOrderChatComponent,
        OverviewRatingsComponent,
        LandLotsComponent,
        OverviewComponent,
        AboutComponent,
        EstateCardComponent,
        HarvestCardComponent,
        GreenCoffeeComponent,
        GallaryComponent,
        WhyUsComponent,
    ],
    imports: [
        CommonModule,
        SourcingRoutingModule,
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAacYaKLrRdDZDzrQ5QAdNFMj9nQ2PgweU',
        }),
    ],
})
export class SourcingModule {}
