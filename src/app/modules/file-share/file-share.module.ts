import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileShareRoutingModule } from './file-share-routing.module';
import { SharedModule } from '@shared';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { FileShareListComponent } from './file-share-list/file-share-list.component';
import { FileShareDetailsComponent } from './file-share-details/file-share-details.component';
import { MyfilesComponent } from './file-share-list/myfiles/myfiles.component';
import { SharewithmeComponent } from './file-share-list/sharewithme/sharewithme.component';
import { DocumentFileComponent } from './file-share-details/document-file/document-file.component';
import { VideoFileComponent } from './file-share-details/video-file/video-file.component';
import { FolderDialogComponent } from './components/folder-dialog/folder-dialog.component';
import { EditFileComponent } from './components/edit-file/edit-file.component';
import { EditFolderComponent } from './edit-folder/edit-folder.component';
import { ShareComponent } from './components/share/share.component';
import { MediaPreviewComponent } from './components/media-preview/media-preview.component';
import { FileTableComponent } from './components/file-table/file-table.component';
import { FileCardComponent } from './components/file-card/file-card.component';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { SelectOrderComponent } from './components/select-order/select-order.component';

@NgModule({
    declarations: [
        FileShareListComponent,
        FileShareDetailsComponent,
        MyfilesComponent,
        SharewithmeComponent,
        DocumentFileComponent,
        VideoFileComponent,
        FolderDialogComponent,
        EditFileComponent,
        EditFolderComponent,
        ShareComponent,
        MediaPreviewComponent,
        FileTableComponent,
        FileCardComponent,
        VideoCardComponent,
        SelectOrderComponent,
    ],
    entryComponents: [FolderDialogComponent, EditFileComponent, ShareComponent, MediaPreviewComponent],
    imports: [CommonModule, FileShareRoutingModule, SharedModule, Ng2SearchPipeModule],
})
export class FileShareModule {}
