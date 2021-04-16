import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourcingRoutingModule } from './sourcing-routing.module';
import { SharedModule } from '@shared';

import { AgmCoreModule } from '@agm/core';
import { RatingModule } from 'ng-starrating';

import { CertificateImgPipe } from './certificateImg.pipe';
import { FlavourPipe } from './flavour.pipe';

import { SourcingComponent } from './sourcing/sourcing.component';
import { EstateListComponent } from './estate-list/estate-list.component';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';
import { CoffeeDetailsComponent } from './coffee-details/coffee-details.component';
import { AvailableConfirmOrderComponent } from './coffee-details/available-confirm-order/available-confirm-order.component';
import { EstateDetailsComponent } from './estate-details/estate-details.component';
import { OverviewRatingsComponent } from './estate-details/overview-ratings/overview-ratings.component';
import { LandLotsComponent } from './estate-details/land-lots/land-lots.component';
import { LotDetailsComponent } from './lot-details/lot-details.component';
import { PrebookConfirmOrderComponent } from './lot-details/prebook-confirm-order/prebook-confirm-order.component';
import { OverviewComponent } from './estate-details/overview/overview.component';
import { AboutComponent } from './estate-details/about/about.component';
import { EstateCardComponent } from './estate-card/estate-card.component';
import { HarvestCardComponent } from './harvest-card/harvest-card.component';
import { GreenCoffeeComponent } from './estate-details/green-coffee/green-coffee.component';
import { GalleryComponent } from './estate-details/gallery/gallery.component';
import { WhyUsComponent } from './estate-details/why-us/why-us.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
    declarations: [
        CertificateImgPipe,
        FlavourPipe,
        SourcingComponent,
        EstateListComponent,
        CoffeeListComponent,
        CoffeeDetailsComponent,
        AvailableConfirmOrderComponent,
        EstateDetailsComponent,
        OverviewRatingsComponent,
        LandLotsComponent,
        LotDetailsComponent,
        PrebookConfirmOrderComponent,
        OverviewComponent,
        AboutComponent,
        EstateCardComponent,
        HarvestCardComponent,
        GreenCoffeeComponent,
        GalleryComponent,
        WhyUsComponent,
        FilterComponent,
    ],
    imports: [CommonModule, SourcingRoutingModule, SharedModule, AgmCoreModule, RatingModule],
    entryComponents: [FilterComponent],
})
export class SourcingModule {}
