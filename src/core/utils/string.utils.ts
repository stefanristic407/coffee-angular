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
