import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';
import { FileService } from '@services';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { MediaPreviewComponent } from './components/media-preview/media-preview.component';
import { ConfirmComponent } from '@shared';
import { FolderDialogComponent } from './components/folder-dialog/folder-dialog.component';
import { EditFileComponent } from './components/edit-file/edit-file.component';
import { ShareComponent } from './components/share/share.component';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'underscore';
import { Action, FileType } from '@models';

@Injectable({
    providedIn: 'root',
})
export class FileShareService {
    loading = false;
    pinnedData: any = [];
    filesTerm: any;
    filterTerm: any;
    roasterId: any;
    folderId: any = null;
    allFiles: any;
    fileTree: any = {};
    mainData: any[] = [];
    viewMode: any = new BehaviorSubject('grid');
    viewMode$: any = this.viewMode.asObservable();
    action: any = new BehaviorSubject(Action.EMPTY);
    action$: any = this.action.asObservable();
    queryParams: any = new BehaviorSubject({
        search: '',
        type: '',
    });
    queryParams$: any = this.queryParams.asObservable();

    constructor(
        public dialogSrv: DialogService,
        public fileSrv: FileService,
        public globals: GlobalsService,
        public roasterService: RoasterserviceService,
        public toastrService: ToastrService,
        public cookieService: CookieService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.queryParams$.subscribe((params: any) => {
            this.filterData();
        });
    }

    // Broadcast require refresh
    refresh() {
        this.action.next(Action.REFRESH);
    }

    // Broadcast data retrieved event
    dataRetrieved() {
        this.action.next(Action.DATA_RETRIEVED);
    }

    clearQueryParams() {
        this.queryParams.next({
            search: '',
            type: '',
        });
    }

    filterData() {
        const search = this.queryParams.getValue().search || '';
        const type = this.queryParams.getValue().type;
        if (this.fileTree && this.fileTree[this.folderId]) {
            this.mainData = this.fileTree[this.folderId].children.filter((element) => {
                return (
                    element.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 &&
                    (!type ||
                        type.indexOf(element.type) >= 0 ||
                        (type === FileType.VIDEO &&
                            element.type === FileType.FOLDER &&
                            this.fileTree[element.id].videoCnt > 0))
                );
            });
        } else {
            this.mainData = null;
        }
    }

    getFilesandFolders() {
        this.loading = true;
        this.fileSrv
            .getFilesandFolders({
                file_module: 'File-Share',
            })
            .subscribe((res: any) => {
                this.loading = false;
                if (res.success) {
                    this.allFiles = res.result;
                    this.fileTree = {};
                    this.makeFolderTree({ id: 0 });
                    this.filterData();
                    this.dataRetrieved();
                } else {
                    this.toastrService.error('Error while getting the Files and Folders');
                }
            });
    }

    getSharedFilesandFolders() {
        this.loading = true;
        this.roasterService.getSharedFilesandFolders(this.roasterId).subscribe((res: any) => {
            this.loading = false;
            if (res.success) {
                this.allFiles = res.result;
                this.fileTree = {};
                this.makeFolderTree({ id: 0 });
                this.filterData();
                this.dataRetrieved();
            } else {
                this.toastrService.error('Error while getting the Shared Files and Folders');
            }
        });
    }

    makeFolderTree(folder, originParents: any[] = []): number {
        if (folder.id !== 0 && folder.type !== 'FOLDER') {
            return;
        }
        const parents = JSON.parse(JSON.stringify(originParents));
        if (folder.parent_id) {
            parents.push(folder.parent_id);
        }
        const items: any[] = this.allFiles.filter((element) => element.parent_id === folder.id);
        let videoCnt = 0;
        const children = [];
        items.forEach((element) => {
            children.push(element);
            if (element.type === 'VIDEO') {
                videoCnt++;
            }
            if (element.type === 'FOLDER') {
                videoCnt += this.makeFolderTree(element, parents);
            }
        });
        this.fileTree = { ...this.fileTree, [folder.id]: { ...folder, videoCnt, parents, children } };
        return videoCnt;
    }

    getPinnedFilesorFolders() {
        this.roasterService.getPinnedFilesandFolders(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                console.log(res.result);
                this.pinnedData = res.result;
            } else {
                this.toastrService.error('Error while getting the pinned files/folders');
            }
        });
    }

    uploadFile(event: any) {
        const files = event.target.files;
        const fileName = files[0].name;
        if (files.length > 0) {
            const file: File = files[0];
            const formData: FormData = new FormData();
            formData.append('file', file, file.name);
            formData.append('name', fileName);
            formData.append('file_module', 'File-Share');
            formData.append('parent_id', this.folderId);
            this.roasterId = this.cookieService.get('roaster_id');
            formData.append('api_call', '/ro/' + this.roasterId + '/file-manager/files');
            formData.append('token', this.cookieService.get('Auth'));
            this.fileSrv.uploadFiles(formData).subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('The file ' + fileName + ' uploaded successfully');
                    this.refresh();
                } else {
                    this.toastrService.error('Error while uploading the file');
                }
            });
        }
    }

    downloadFile(item: any) {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: 'Please confirm!',
                    desp: 'Are you sure want to download',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    const a = document.createElement('a');
                    a.href = item.url;
                    a.download = item.name;
                    a.target = '_blank';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            });
    }

    pinFileorFolder(id: any) {
        this.fileSrv.pinFileorFolder(id).subscribe((res: any) => {
            if (res.success) {
                this.toastrService.success('The Selected file/folder is pinned successfully');
                this.getPinnedFilesorFolders();
            } else {
                this.toastrService.error('Error while pinning the File/Folder');
            }
        });
    }

    unpinFileorFolder(id: any) {
        this.fileSrv.unpinFileorFolder(id).subscribe((res: any) => {
            if (res.success) {
                this.toastrService.success('The Selected file/folder is unpinned successfully');
                this.getPinnedFilesorFolders();
            } else {
                this.toastrService.error('Error while unpinning the File/Folder');
            }
        });
    }

    preview(item) {
        this.dialogSrv.open(MediaPreviewComponent, {
            data: { record: item },
            showHeader: false,
            styleClass: 'preview-dialog',
        });
    }

    updateFolder(item: any = null) {
        this.dialogSrv
            .open(FolderDialogComponent, {
                data: {
                    record: item,
                },
                header: item ? this.globals.languageJson.update_folder : this.globals.languageJson.create_folder,
                styleClass: 'folder-dialog',
            })
            .onClose.subscribe((result: any) => {
                if (result) {
                    this.refresh();
                }
            });
    }

    updateFile(item: any = null) {
        this.dialogSrv
            .open(EditFileComponent, {
                data: {
                    record: item,
                },
                header: item ? this.globals.languageJson.update_file : this.globals.languageJson.create_file,
                styleClass: 'file-dialog',
            })
            .onClose.subscribe((result: any) => {
                if (result) {
                    this.refresh();
                }
            });
    }

    openShareModal(item: any) {
        this.dialogSrv
            .open(ShareComponent, {
                data: {
                    record: item,
                },
                header: this.globals.languageJson.share,
                styleClass: 'share-dialog',
            })
            .onClose.subscribe((result: any) => {
                if (result) {
                    this.refresh();
                }
            });
    }

    openDeleteModal(item: any) {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    if (item.type === 'FOLDER') {
                        this.deleteFolder(item.id);
                    } else {
                        this.deleteFile(item.id);
                    }
                }
            });
    }

    deleteFolder(id: any) {
        this.fileSrv.deleteFolder(id).subscribe((res: any) => {
            if (res.success) {
                this.toastrService.success('The Selected folder is deleted successfully');
                setTimeout(() => {
                    this.refresh();
                }, 2000);
            } else {
                this.toastrService.error('Error while deleting the Folder');
            }
        });
    }

    deleteFile(id: any) {
        this.fileSrv.deleteFile(id).subscribe((res: any) => {
            if (res.success) {
                this.toastrService.success('The Selected file is deleted successfully');
                setTimeout(() => {
                    this.refresh();
                }, 2500);
            } else {
                this.toastrService.error('Error while deleting the File');
            }
        });
    }
}
