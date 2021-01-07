import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AvatarComponent } from './components/avatar/avatar.component';

// #region material
const MATMODULES = [];
// #endregion

// #region third libs
const THIRDMODULES = [];
// #endregion

// #region your componets & directives
const COMPONENTS = [AvatarComponent];
const COMPONENTS_NOROUNT = [];
const DIRECTIVES = [];
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...MATMODULES,
    // third libs
    ...THIRDMODULES,
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    ...DIRECTIVES,
  ],
  entryComponents: COMPONENTS_NOROUNT,
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...MATMODULES,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
})
export class SharedModule {}
