import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@shared';

import { ArticleCardComponent } from './article-card/article-card.component';
import { ForumCardComponent } from './forum-card/forum-card.component';
import { ForumMenuComponent } from './forum-menu/forum-menu.component';
import { LikeDividerComponent } from './like-divider/like-divider.component';
import { QuestionCardComponent } from './question-card/question-card.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { CategoryListComponent } from './category-list/category-list.component';

const COMPONENTS = [
    ArticleCardComponent,
    ForumCardComponent,
    ForumMenuComponent,
    LikeDividerComponent,
    QuestionCardComponent,
    RecipeCardComponent,
    UserHeaderComponent,
    CategoryListComponent,
];

@NgModule({
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    imports: [CommonModule, FormsModule, SharedModule],
})
export class CoffeeLabSharedModule {}
