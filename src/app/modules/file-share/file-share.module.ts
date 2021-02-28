import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileShareRoutingModule } from './file-share-routing.module';
import { SharedModule } from '@shared';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { FileShareComponent } from './file-share.component';
import { FileShareDetailsComponent } from './file-share-details/file-share-details.component';
import { MyfilesComponent } from './myfiles/myfiles.component';
import { SharewithmeComponent } from './sharewithme/sharewithme.component';
import { DocumentFileComponent } from './file-share-details/document-file/document-file.component';
import { VideoFileComponent } from './file-share-details/video-file/video-file.component';
import { DocumentTableComponent } from './file-share-details/document-table/document-table.component';
import { VideoTableComponent } from './file-share-details/video-table/video-table.component';
import { FolderDialogComponent } from './folder-dialog/folder-dialog.component';
import { EditFileComponent } from './edit-file/edit-file.component';
import { EditFolderComponent } from './edit-folder/edit-folder.component';
import { ShareComponent } from './share/share.component';

@NgModule({
    declarations: [
        FileShareComponent,
        FileShareDetailsComponent,
        MyfilesComponent,
        SharewithmeComponent,
        DocumentFileComponent,
        VideoFileComponent,
        DocumentTableComponent,
        VideoTableComponent,
        FolderDialogComponent,
        EditFileComponent,
        EditFolderComponent,
        ShareComponent,
    ],
    entryComponents: [FolderDialogComponent, EditFileComponent, ShareComponent],
    imports: [CommonModule, FileShareRoutingModule, SharedModule, Ng2SearchPipeModule],
})
export class FileShareModule {}
