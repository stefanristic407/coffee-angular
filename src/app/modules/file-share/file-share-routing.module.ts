import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards';

import { FileShareDetailsComponent } from './file-share-details/file-share-details.component';
import { FileShareListComponent } from './file-share-list/file-share-list.component';
import { MyfilesComponent } from './file-share-list/myfiles/myfiles.component';
import { SharewithmeComponent } from './file-share-list/sharewithme/sharewithme.component';
import { EditFolderComponent } from './edit-folder/edit-folder.component';
import { DocumentFileComponent } from './file-share-details/document-file/document-file.component';
import { VideoFileComponent } from './file-share-details/video-file/video-file.component';

const routes: Routes = [
    {
        path: '',
        component: FileShareListComponent,
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
        path: 'file-share-details/:folderId',
        component: FileShareDetailsComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'documents',
                component: DocumentFileComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'videos',
                component: VideoFileComponent,
                canActivate: [AuthGuard],
            },
            { path: '', redirectTo: 'documents', pathMatch: 'full' },
        ],
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
