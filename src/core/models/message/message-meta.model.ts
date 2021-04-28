import { StickerListItem } from './sticker-listitem.model';
import { MessageMetaTypes } from '@enums';
export interface MessageMeta {
    type: MessageMetaTypes;
    sticker?: {
        name: string;
        version: number;
        category: string;
        stickerItem?: StickerListItem;
    };
    dispute_details?: {
        id: number;
        content: string;
    };
}
