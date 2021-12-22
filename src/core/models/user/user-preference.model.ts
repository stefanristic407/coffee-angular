import { AreaUnit, QuantityUnit, TextSize } from '@enums';

export interface UserPreference {
    farm_size_unit: AreaUnit;
    quantity_unit: QuantityUnit;
    read_recipient: boolean;
    enable_emoticons: boolean;
    chat_text_size: TextSize;
    enable_desktop_notification: boolean;
    order_related_updates: boolean;
    new_answer_notification: boolean;
    new_chat_notification: boolean;
    notification_sound: boolean;
    logout_all_confirmation: boolean;
}
