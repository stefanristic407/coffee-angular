import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CoffeeLabService } from '@services';
import { SharedModule } from '@shared';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { ArticlesViewComponent } from './articles/articles-view/articles-view.component';
import { AssignedToMeViewComponent } from './assigned-to-me/assigned-to-me-view/assigned-to-me-view.component';
import { CategoryPostsComponent } from './category/category-posts/category-posts.component';
import { CategoryComponent } from './category/category.component';
import { CoffeeLabRoutingModule } from './coffee-lab-routing.module';
import { CoffeeLabComponent } from './coffee-lab.component';
import { CoffeeDetailsComponent } from './coffee-recipes/coffee-details/coffee-details.component';
import { CoffeeRecipesViewComponent } from './coffee-recipes/coffee-recipes-view/coffee-recipes-view.component';
import { CoffeeLabComponentsModule } from './components/coffee-lab-components.module';
import { CreateArticleComponent } from './create-post/create-article/create-article.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CreateQuestionComponent } from './create-post/create-question/create-question.component';
import { CreateRecipeComponent } from './create-post/create-recipe/create-recipe.component';
import { DraftPostsComponent } from './create-post/draft-posts/draft-posts.component';
import { TabContainerComponent } from './create-post/tab-container/tab-container.component';
import { TranslateAnswerComponent } from './create-post/translate/translate-answer/translate-answer.component';
import { TranslateArticleComponent } from './create-post/translate/translate-article/translate-article.component';
import { RecipeOriginalPostComponent } from './create-post/translate/translate-recipe/recipe-original-post/recipe-original-post.component';
import { TranslateRecipeComponent } from './create-post/translate/translate-recipe/translate-recipe.component';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { MyAnswersComponent } from './my-posts/my-answers/my-answers.component';
import { MyArticlesComponent } from './my-posts/my-articles/my-articles.component';
import { MyCommentsComponent } from './my-posts/my-comments/my-comments.component';
import { MyPostsViewComponent } from './my-posts/my-posts-view/my-posts-view.component';
import { MyRecipesComponent } from './my-posts/my-recipes/my-recipes.component';
import { QaPostComponent } from './my-posts/qa-post/qa-post.component';
import { OverviewComponent } from './overview/overview.component';
import { QaForumViewComponent } from './qa-forum/qa-forum-view/qa-forum-view.component';
import { QuestionDetailComponent } from './qa-forum/question-detail/question-detail.component';
import { SavedArticlesComponent } from './saved-posts/saved-articles/saved-articles.component';
import { SavedPostsViewComponent } from './saved-posts/saved-posts-view/saved-posts-view.component';
import { SavedRecipesComponent } from './saved-posts/saved-recipes/saved-recipes.component';

@NgModule({
    declarations: [
        ArticleDetailComponent,
        ArticlesViewComponent,
        AssignedToMeViewComponent,
        CoffeeDetailsComponent,
        CoffeeLabComponent,
        CoffeeRecipesViewComponent,
        CreateArticleComponent,
        CreatePostComponent,
        CreateQuestionComponent,
        CreateRecipeComponent,
        DraftPostsComponent,
        GlobalSearchComponent,
        MyAnswersComponent,
        MyArticlesComponent,
        MyCommentsComponent,
        MyPostsViewComponent,
        MyRecipesComponent,
        OverviewComponent,
        QaForumViewComponent,
        QaPostComponent,
        QuestionDetailComponent,
        RecipeOriginalPostComponent,
        SavedArticlesComponent,
        SavedPostsViewComponent,
        SavedRecipesComponent,
        TabContainerComponent,
        TranslateAnswerComponent,
        TranslateArticleComponent,
        TranslateRecipeComponent,
        CategoryComponent,
        CategoryPostsComponent,
    ],
    imports: [
        CommonModule,
        CoffeeLabRoutingModule,
        SharedModule,
        FormsModule,
        CoffeeLabComponentsModule,
        TranslateModule.forChild({
            isolate: true,
        }),
    ],
    providers: [CoffeeLabService],
})
export class CoffeeLabModule {}
