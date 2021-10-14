import * as _ from 'lodash';

export const trimCharRight = (str: string, char: string): string => {
    const regex = new RegExp(`${char}+$`, 'gi');
    return str.replace(regex, '');
};

export const trackFileName = (url: string): string => {
    if (url) {
        return url.split('?')[0].split('/').pop();
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

export const insertAltAttr = (content: string, alt: string): string => {
    const altStr = ` alt="${alt}"`;
    // Remove alt attribute
    while (1) {
        const img = RegExp(/<img.*?(alt=".*?")[^>]*>/g).exec(content);
        if (!img) {
            break;
        }
        content = content.replace(img[1], '');
    }
    // Insert alt attribute
    while (1) {
        const img = RegExp(/<img(?!.*\s+alt\s*=)[^>]*>/g).exec(content);
        if (!img) {
            break;
        }
        const originTag = img[0];
        const position = originTag.length - 1;
        const imageTag = originTag.slice(0, position) + altStr + originTag.slice(position);
        content = content.replace(originTag, imageTag);
    }
    return content;
};

export const toSentenceCase = (str: string = '', decodeSnake: boolean = true): any => {
    // decodeSnake: To remove special characters(undersocre and dash)
    return decodeSnake ? _.upperFirst(_.lowerCase(str)) : _.upperFirst(str.toLocaleLowerCase());
};
