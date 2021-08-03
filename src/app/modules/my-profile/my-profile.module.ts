import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ProfileCertificatesEditComponent } from './profile-certificates-edit/profile-certificates-edit.component';
import { ProfileCertificatesViewComponent } from './profile-certificates-view/profile-certificates-view.component';

@NgModule({
    declarations: [MyProfileComponent, ProfileCertificatesEditComponent, ProfileCertificatesViewComponent],
    imports: [CommonModule, MyProfileRoutingModule, ReactiveFormsModule, SharedModule],
})
export class MyProfileModule {}
