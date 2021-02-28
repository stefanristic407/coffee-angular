import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards';

import { FileShareDetailsComponent } from './file-share-details/file-share-details.component';
import { FileShareComponent } from './file-share.component';
import { MyfilesComponent } from './myfiles/myfiles.component';
import { SharewithmeComponent } from './sharewithme/sharewithme.component';
import { EditFolderComponent } from './edit-folder/edit-folder.component';

const routes: Routes = [
    {
        path: '',
        component: FileShareComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'my-files',
                component: MyfilesComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'shared-files',
                component: SharewithmeComponent,
                canActivate: [AuthGuard],
            },
            { path: '', redirectTo: 'my-files', pathMatch: 'full' },
        ],
    },
    {
        path: 'file-share-details',
        component: FileShareDetailsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'file-share-details/:folderId',
        component: FileShareDetailsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'create-folder',
        component: EditFolderComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FileShareRoutingModule {}
