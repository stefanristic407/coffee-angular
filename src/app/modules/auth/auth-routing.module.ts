import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'privacy-policy',
                component: PrivacyPolicyComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
