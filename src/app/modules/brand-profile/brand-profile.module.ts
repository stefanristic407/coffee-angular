import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandProfileRoutingModule } from './brand-profile-routing.module';
import { SharedModule } from '@shared';
import { AgmCoreModule } from '@agm/core';

import { BrandProfileComponent } from './brand-profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LearnComponent } from './learn/learn.component';
import { SustainabilityComponent } from './sustainability/sustainability.component';
import { VisitUsComponent } from './visit-us/visit-us.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { BrandProfileHeaderComponent } from './components/brand-profile-header/brand-profile-header.component';
import { BrandProfileFooterComponent } from './components/brand-profile-footer/brand-profile-footer.component';
import { BrandUploaderComponent } from './components/brand-uploader/brand-uploader.component';

@NgModule({
    declarations: [
        BrandProfileComponent,
        AboutUsComponent,
        LearnComponent,
        SustainabilityComponent,
        VisitUsComponent,
        FeaturedProductsComponent,
        BrandProfileHeaderComponent,
        BrandProfileFooterComponent,
        BrandUploaderComponent,
    ],
    imports: [CommonModule, BrandProfileRoutingModule, SharedModule, AgmCoreModule],
})
export class BrandProfileModule {}
