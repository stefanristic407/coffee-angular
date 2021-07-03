export const trimCharRight = (str: string, char: string): string => {
    const regex = new RegExp(`${char}+$`, 'gi');
    return str.replace(regex, '');
};

export const trackFileName = (url: string): string => {
    if (url) {
        const strArr = url.split('/');
        const lastItem = strArr[strArr.length - 1];
        return lastItem.split('?')[0];
    }
    return '';
};

export const dataURItoBlob = (dataURI: string): any => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
};
