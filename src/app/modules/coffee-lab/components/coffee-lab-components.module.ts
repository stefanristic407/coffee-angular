import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ArticlesComponent } from './articles/articles.component';
import { CoffeeLabSharedModule } from './coffee-lab-shared.module';
import { CommentsComponent } from './comments/comments.component';
import { ForumEditorComponent } from './forum-editor/forum-editor.component';
import { InfoTooltipComponent } from './info-tooltip/info-tooltip.component';
import { JoinCommunityComponent } from './join-community/join-community.component';
import { LanguageDropdownComponent } from './language-dropdown/language-dropdown.component';
import { PopularPostsComponent } from './popular-posts/popular-posts.component';
import { PublishForumComponent } from './publish-forum/publish-forum.component';
import { QuestionsComponent } from './questions/questions.component';
import { RecipesComponent } from './recipes/recipes.component';
import { TranslateToastComponent } from './translate-toast/translate-toast.component';
import { TranslationDropdownComponent } from './translation-dropdown/translation-dropdown.component';

const COMPONENTS = [
    ArticlesComponent,
    CommentsComponent,
    ForumEditorComponent,
    InfoTooltipComponent,
    JoinCommunityComponent,
    LanguageDropdownComponent,
    PublishForumComponent,
    QuestionsComponent,
    RecipesComponent,
    TranslateToastComponent,
    TranslationDropdownComponent,
    PopularPostsComponent,
];

@NgModule({
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS, CoffeeLabSharedModule],
    imports: [CommonModule, FormsModule, SharedModule, CoffeeLabSharedModule],
})
export class CoffeeLabComponentsModule {}
