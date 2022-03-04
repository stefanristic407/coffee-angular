import { Injectable } from '@angular/core';
import { Action, FileModule, FileType } from '@enums';
import { Download } from '@models';
import { DownloadService, FileService, GlobalsService } from '@services';
import { ConfirmComponent } from '@shared';
import { checkFile } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'underscore';
import { EditFileComponent } from './components/edit-file/edit-file.component';
import { FolderDialogComponent } from './components/folder-dialog/folder-dialog.component';
import { MediaPreviewComponent } from './components/media-preview/media-preview.component';
import { ShareComponent } from './components/share/share.component';

@Injectable({
    providedIn: 'root',
})
export class FileShareService {
    loading = false;
    pinnedData: any = [];
    filesTerm: any;
    filterTerm: any;
    folderId: any = null;
    allFiles: any;
    fileTree: any = {};
    mainData: any[] = [];
    selectedItems = [];
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
        private dialogSrv: DialogService,
        private downloadService: DownloadService,
        private fileSrv: FileService,
        private globals: GlobalsService,
        private toastrService: ToastrService,
    ) {
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

    getAllFiles() {
        this.loading = true;
        this.fileSrv
            .getAllFiles({
                file_module: FileModule.FileShare,
                sort_by: 'updated_at',
                sort_order: 'desc',
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

    getMyFiles() {
        this.loading = true;
        this.fileSrv
            .getMyFiles({
                file_module: FileModule.FileShare,
                sort_by: 'updated_at',
                sort_order: 'desc',
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
        this.fileSrv
            .getSharedFilesandFolders({
                file_module: FileModule.FileShare,
                sort_by: 'updated_at',
                sort_order: 'desc',
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
                    this.toastrService.error('Error while getting the Shared Files and Folders');
                }
            });
    }

    makeFolderTree(folder, originParents: any[] = []): number {
        if (folder.id !== 0 && folder.type !== FileType.FOLDER) {
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
            if (element.type === FileType.VIDEO) {
                videoCnt++;
            }
            if (element.type === FileType.FOLDER) {
                videoCnt += this.makeFolderTree(element, parents);
            }
        });
        this.fileTree = { ...this.fileTree, [folder.id]: { ...folder, videoCnt, parents, children } };
        return videoCnt;
    }

    getPinnedFilesorFolders() {
        this.fileSrv
            .getPinnedFilesandFolders({
                file_module: FileModule.FileShare,
                sort_by: 'updated_at',
                sort_order: 'desc',
            })
            .subscribe((res: any) => {
                if (res.success) {
                    this.pinnedData = res.result;
                } else {
                    this.toastrService.error('Error while getting the pinned files/folders');
                }
            });
    }

    uploadFile(event: any) {
        const files = event.target.files;
        if (files.length > 0) {
            const file: File = files[0];
            checkFile(file).subscribe((res) => {
                if (res) {
                    this.toastrService.error(res.message);
                } else {
                    const fileName = file.name;
                    const formData: FormData = new FormData();
                    formData.append('file', file, file.name);
                    formData.append('name', fileName);
                    formData.append('file_module', FileModule.FileShare);
                    formData.append('parent_id', this.folderId);
                    this.fileSrv.uploadFiles(formData).subscribe((res: any) => {
                        if (res.success) {
                            this.toastrService.success('The file ' + fileName + ' uploaded successfully');
                            this.refresh();
                        } else {
                            this.toastrService.error('Error while uploading the file');
                        }
                    });
                }
                event.target.value = '';
            });
        }
    }

    downloadFile(item: any) {
        this.downloadService.download(item.url, item.name, item.mime).subscribe(
            (res: Download) => {
                if (res?.state === 'DONE') {
                    this.toastrService.success('Downloaded successfully');
                }
            },
            (error) => {
                this.toastrService.error('Download failed');
            },
        );
    }

    pinFileorFolder(id: any) {
        this.fileSrv.pinFileorFolder(id).subscribe((res: any) => {
            if (res.success) {
                this.toastrService.success('The Selected file/folder is pinned successfully');
                this.getPinnedFilesorFolders();
                this.refresh();
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
                this.refresh();
            } else {
                this.toastrService.error('Error while unpinning the File/Folder');
            }
        });
    }

    preview(item) {
        this.dialogSrv.open(MediaPreviewComponent, {
            data: { record: item },
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
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    if (item.type === FileType.FOLDER) {
                        this.deleteFolder(item.id);
                    } else {
                        this.deleteFile(item.id);
                    }
                }
            });
    }

    deleteItems() {
        const self = this;
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    const promises = [];
                    this.selectedItems.forEach((element) =>
                        promises.push(
                            new Promise((resolve, reject) =>
                                self.deleteFolderOrFile(element).subscribe((res: any) => {
                                    if (res.success) {
                                        resolve(res);
                                    } else {
                                        reject();
                                    }
                                }),
                            ),
                        ),
                    );
                    Promise.all(promises)
                        .then((result) => {
                            this.toastrService.success('The Selected items were deleted successfully');
                            this.selectedItems = [];
                            this.refresh();
                        })
                        .catch(() => {
                            this.toastrService.error('Error while deleting the items');
                            this.selectedItems = [];
                            this.refresh();
                        });
                }
            });
    }

    deleteFolderOrFile(element) {
        return element.type === FileType.FOLDER
            ? this.fileSrv.deleteFolder(element.id)
            : this.fileSrv.deleteFile(element.id);
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
