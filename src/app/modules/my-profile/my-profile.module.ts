import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ImageCropDialogComponent } from './image-crop-dialog/image-crop-dialog.component';

@NgModule({
    declarations: [MyProfileComponent, ImageCropDialogComponent],
    imports: [CommonModule, MyProfileRoutingModule, ReactiveFormsModule, SharedModule],
})
export class MyProfileModule {}
