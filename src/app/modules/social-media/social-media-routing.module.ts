import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { SocialMediaComponent } from './social-media.component';

const routes: Routes = [
    {
        path: 'media',
        component: SocialMediaComponent,
    },
    {
        path: 'media/:type',
        component: SocialMediaComponent,
    },
    {
        path: 'blog-details/:id',
        component: BlogDetailsComponent,
    },
    {
        path: '',
        redirectTo: 'media',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SocialMediaRoutingModule {}
