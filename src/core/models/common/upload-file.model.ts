export interface UploadFile extends File {
    uploadStatus: 'IP' | 'DONE' | 'FAIL';
    fileId: number;
}
