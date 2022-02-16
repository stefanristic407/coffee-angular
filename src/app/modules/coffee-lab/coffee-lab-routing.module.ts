import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostType } from '@enums';
import { ArticlesViewComponent } from '@modules/coffee-lab/articles/articles-view/articles-view.component';
import { AssignedToMeViewComponent } from '@modules/coffee-lab/assigned-to-me/assigned-to-me-view/assigned-to-me-view.component';
import { CoffeeRecipesViewComponent } from '@modules/coffee-lab/coffee-recipes/coffee-recipes-view/coffee-recipes-view.component';
import { TabContainerComponent } from '@modules/coffee-lab/create-post/tab-container/tab-container.component';
import { TranslateAnswerComponent } from '@modules/coffee-lab/create-post/translate/translate-answer/translate-answer.component';
import { TranslateArticleComponent } from '@modules/coffee-lab/create-post/translate/translate-article/translate-article.component';
import { TranslateRecipeComponent } from '@modules/coffee-lab/create-post/translate/translate-recipe/translate-recipe.component';
import { MyArticlesComponent } from '@modules/coffee-lab/my-posts/my-articles/my-articles.component';
import { MyPostsViewComponent } from '@modules/coffee-lab/my-posts/my-posts-view/my-posts-view.component';
import { MyRecipesComponent } from '@modules/coffee-lab/my-posts/my-recipes/my-recipes.component';
import { OverviewComponent } from '@modules/coffee-lab/overview/overview.component';
import { QaForumViewComponent } from '@modules/coffee-lab/qa-forum/qa-forum-view/qa-forum-view.component';
import { QuestionDetailComponent } from '@modules/coffee-lab/qa-forum/question-detail/question-detail.component';
import { SavedArticlesComponent } from '@modules/coffee-lab/saved-posts/saved-articles/saved-articles.component';
import { SavedPostsViewComponent } from '@modules/coffee-lab/saved-posts/saved-posts-view/saved-posts-view.component';
import { SavedRecipesComponent } from '@modules/coffee-lab/saved-posts/saved-recipes/saved-recipes.component';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { CategoryPostsComponent } from './category/category-posts/category-posts.component';
import { CategoryComponent } from './category/category.component';
import { CoffeeLabComponent } from './coffee-lab.component';
import { CoffeeDetailsComponent } from './coffee-recipes/coffee-details/coffee-details.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { MyAnswersComponent } from './my-posts/my-answers/my-answers.component';
import { MyCommentsComponent } from './my-posts/my-comments/my-comments.component';
import { QaPostComponent } from './my-posts/qa-post/qa-post.component';
const routes: Routes = [
    {
        path: '',
        component: CoffeeLabComponent,
        children: [
            {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full',
            },
            {
                path: 'overview',
                component: OverviewComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'qa-forum',
                        pathMatch: 'full',
                    },
                    {
                        path: 'qa-forum',
                        component: QaForumViewComponent,
                    },
                    {
                        path: 'articles',
                        component: ArticlesViewComponent,
                    },
                    {
                        path: 'coffee-recipes',
                        component: CoffeeRecipesViewComponent,
                    },
                    {
                        path: 'my-posts',
                        component: MyPostsViewComponent,
                        children: [
                            { path: '', redirectTo: 'qa-post' },
                            { path: 'qa-post', component: QaPostComponent },
                            { path: 'article', component: MyArticlesComponent },
                            { path: 'recipe', component: MyRecipesComponent },
                            { path: 'answer', component: MyAnswersComponent },
                            { path: 'comment', component: MyCommentsComponent },
                            { path: '**', redirectTo: 'qa-post' },
                        ],
                    },
                    {
                        path: 'saved-posts',
                        component: SavedPostsViewComponent,
                        children: [
                            { path: '', redirectTo: 'qa-post' },
                            { path: 'qa-post', component: QaPostComponent },
                            { path: 'article', component: SavedArticlesComponent },
                            { path: 'recipe', component: SavedRecipesComponent },
                            { path: 'saved-answers', component: MyAnswersComponent },
                            { path: '**', redirectTo: 'qa-post' },
                        ],
                    },
                    {
                        path: 'assigned-to-me',
                        component: AssignedToMeViewComponent,
                    },
                ],
            },
            {
                path: 'articles/:idOrSlug',
                component: ArticleDetailComponent,
            },
            {
                path: 'recipes/:id',
                component: CoffeeDetailsComponent,
            },
            {
                path: 'questions/:slug',
                component: QuestionDetailComponent,
            },
            {
                path: 'search',
                component: GlobalSearchComponent,
            },
            {
                path: 'create-post',
                component: CreatePostComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'tab',
                        pathMatch: 'full',
                    },
                    {
                        path: 'tab',
                        component: TabContainerComponent,
                    },
                    {
                        path: 'translate-answer',
                        component: TranslateAnswerComponent,
                    },
                    {
                        path: 'translate-article',
                        component: TranslateArticleComponent,
                    },
                    {
                        path: 'translate-recipe',
                        component: TranslateRecipeComponent,
                    },
                ],
            },
        ],
    },
    {
        path: 'category/:slug',
        component: CategoryComponent,
        children: [
            {
                path: '',
                redirectTo: 'qa-forum',
                pathMatch: 'full',
            },
            {
                path: 'qa-forum',
                component: CategoryPostsComponent,
                data: { postType: PostType.QA },
            },
            {
                path: 'articles',
                component: CategoryPostsComponent,
                data: { postType: PostType.ARTICLE },
            },
            {
                path: 'coffee-recipes',
                component: CategoryPostsComponent,
                data: { postType: PostType.RECIPE },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoffeeLabRoutingModule {}
