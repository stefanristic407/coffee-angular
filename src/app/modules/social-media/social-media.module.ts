import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialMediaRoutingModule } from './social-media-routing.module';
import { SocialMediaComponent } from './social-media.component';
import { ArticleBlogComponent } from './article-blog/article-blog.component';
import { SharedModule } from '@app/shared';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

@NgModule({
    declarations: [SocialMediaComponent, ArticleBlogComponent, BlogDetailsComponent],
    imports: [CommonModule, SocialMediaRoutingModule, SharedModule, ClipboardModule],
    providers: [],
})
export class SocialMediaModule {}
