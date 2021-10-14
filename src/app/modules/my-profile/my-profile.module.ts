import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { SharedModule } from '@shared';
import { CoffeeLabSharedModule } from '@modules/coffee-lab/components/coffee-lab-shared.module';

import { MyProfileComponent } from './my-profile.component';
import { ProfileCertificatesEditComponent } from './profile-certificates-edit/profile-certificates-edit.component';
import { ProfileCertificatesViewComponent } from './profile-certificates-view/profile-certificates-view.component';
import { MyPostsComponent } from './my-posts/my-posts.component';

@NgModule({
    declarations: [
        MyProfileComponent,
        ProfileCertificatesEditComponent,
        ProfileCertificatesViewComponent,
        MyPostsComponent,
    ],
    imports: [CommonModule, MyProfileRoutingModule, ReactiveFormsModule, SharedModule, CoffeeLabSharedModule],
})
export class MyProfileModule {}
