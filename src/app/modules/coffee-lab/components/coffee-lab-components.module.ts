import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@shared';
import { CoffeeLabSharedModule } from './coffee-lab-shared.module';

import { CommentsComponent } from './comments/comments.component';
import { ForumEditorComponent } from './forum-editor/forum-editor.component';
import { InfoTooltipComponent } from './info-tooltip/info-tooltip.component';
import { JoinCommunityComponent } from './join-community/join-community.component';
import { LanguageDropdownComponent } from './language-dropdown/language-dropdown.component';
import { OriginalViewComponent } from './original-view/original-view.component';
import { PublishForumComponent } from './publish-forum/publish-forum.component';
import { TranslateToastComponent } from './translate-toast/translate-toast.component';
import { TranslationDropdownComponent } from './translation-dropdown/translation-dropdown.component';

const COMPONENTS = [
    CommentsComponent,
    ForumEditorComponent,
    InfoTooltipComponent,
    JoinCommunityComponent,
    LanguageDropdownComponent,
    OriginalViewComponent,
    PublishForumComponent,
    TranslateToastComponent,
    TranslationDropdownComponent,
];

@NgModule({
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS, CoffeeLabSharedModule],
    imports: [CommonModule, FormsModule, SharedModule, CoffeeLabSharedModule],
})
export class CoffeeLabComponentsModule {}
