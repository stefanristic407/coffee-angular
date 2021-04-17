import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeeLabRoutingModule } from './coffee-lab-routing.module';
import { SharedModule } from '@shared';
import { CoffeeLabComponent } from './coffee-lab.component';
import { LanguageDropdownComponent } from './components/language-dropdown/language-dropdown.component';
import { TranslationDropdownComponent } from './components/translation-dropdown/translation-dropdown.component';
import { ForumCardComponent } from './components/forum-card/forum-card.component';
import { ArticlesViewComponent } from './articles/articles-view/articles-view.component';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { OverviewComponent } from './overview/overview.component';
import { QaForumViewComponent } from './qa-forum/qa-forum-view/qa-forum-view.component';
import { CoffeeRecipesViewComponent } from './coffee-recipes/coffee-recipes-view/coffee-recipes-view.component';
import { MyPostsViewComponent } from './my-posts/my-posts-view/my-posts-view.component';
import { SavedPostsViewComponent } from './saved-posts/saved-posts-view/saved-posts-view.component';
import { CommentsComponent } from './components/comments/comments.component';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { CoffeeDetailsComponent } from './coffee-recipes/coffee-details/coffee-details.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QaPostComponent } from './my-posts/qa-post/qa-post.component';
import { MyCommentsComponent } from './my-posts/my-comments/my-comments.component';
import { CreatePostComponent } from './qa-forum/create-post/create-post.component';
import { DraftPostsComponent } from './qa-forum/create-post/draft-posts/draft-posts.component';
import { FormsModule } from '@angular/forms';
import { QuestionDetailComponent } from './qa-forum/question-detail/question-detail.component';
import { OriginalViewComponent } from './components/original-view/original-view.component';
import { MyAnswersComponent } from './my-posts/my-answers/my-answers.component';
@NgModule({
    declarations: [
        CoffeeLabComponent,
        LanguageDropdownComponent,
        ForumCardComponent,
        TranslationDropdownComponent,
        ArticlesViewComponent,
        ArticleDetailComponent,
        OverviewComponent,
        QaForumViewComponent,
        CoffeeRecipesViewComponent,
        MyPostsViewComponent,
        SavedPostsViewComponent,
        CommentsComponent,
        UserHeaderComponent,
        CoffeeDetailsComponent,
        QuestionsComponent,
        QaPostComponent,
        MyCommentsComponent,
        CreatePostComponent,
        DraftPostsComponent,
        QuestionDetailComponent,
        OriginalViewComponent,
        MyAnswersComponent,
    ],
    imports: [CommonModule, CoffeeLabRoutingModule, SharedModule, FormsModule],
})
export class CoffeeLabModule {}
