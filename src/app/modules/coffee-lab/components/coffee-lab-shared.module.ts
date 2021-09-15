import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@shared';

import { ArticlesComponent } from './articles/articles.component';
import { ForumCardComponent } from './forum-card/forum-card.component';
import { ForumMenuComponent } from './forum-menu/forum-menu.component';
import { LikeDividerComponent } from './like-divider/like-divider.component';
import { QuestionsComponent } from './questions/questions.component';
import { RecipesComponent } from './recipes/recipes.component';
import { UserHeaderComponent } from './user-header/user-header.component';

const COMPONENTS = [
    ArticlesComponent,
    ForumCardComponent,
    ForumMenuComponent,
    LikeDividerComponent,
    QuestionsComponent,
    RecipesComponent,
    UserHeaderComponent,
];

@NgModule({
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    imports: [CommonModule, FormsModule, SharedModule],
})
export class CoffeeLabSharedModule {}
