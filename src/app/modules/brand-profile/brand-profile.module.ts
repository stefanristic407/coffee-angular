import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandProfileRoutingModule } from './brand-profile-routing.module';
import { SharedModule } from '@shared';

import { BrandProfileComponent } from './brand-profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LearnComponent } from './learn/learn.component';
import { SustainabilityComponent } from './sustainability/sustainability.component';
import { VisitUsComponent } from './visit-us/visit-us.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';

@NgModule({
    declarations: [BrandProfileComponent, HomePageComponent, LearnComponent, SustainabilityComponent, VisitUsComponent, FeaturedProductsComponent],
    imports: [CommonModule, BrandProfileRoutingModule, SharedModule],
})
export class BrandProfileModule {}
