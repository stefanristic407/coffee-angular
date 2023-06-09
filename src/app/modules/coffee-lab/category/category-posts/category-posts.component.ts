import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { LinkType, PostType } from '@enums';
import { CoffeeLabService, ResizeService } from '@services';

@Component({
    selector: 'app-category-posts',
    templateUrl: './category-posts.component.html',
    styleUrls: ['./category-posts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPostsComponent extends ResizeableComponent implements OnInit {
    readonly PostType = PostType;
    readonly qaLink = LinkType.QA;
    postType: PostType;
    sortOptions = [
        { label: 'latest', value: 'latest' },
        { label: 'most_answered', value: 'most_answered' },
        { label: 'oldest', value: 'oldest' },
    ];
    filterOptions = [
        { label: 'coffee_experts', value: false },
        { label: 'coffee_consumer', value: true },
    ];
    orderList: any[] = [
        { label: 'latest', value: 'latest' },
        { label: 'oldest', value: 'oldest' },
    ];
    translationsList: any[] = [
        { label: 'yes', value: true },
        { label: 'no', value: false },
    ];
    showAll = true;
    isBrowser = false;
    sortBy: string;
    filterBy: any;
    isAvailableTranslation: boolean = null;
    selectedOrder: string;
    slug: any;
    totalRecords = 0;
    page = 1;
    rows = 6;
    posts: any;
    isLoading: boolean;
    topWriters: any;
    otherCategories: any[];

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        protected resizeService: ResizeService,
        private activatedRoute: ActivatedRoute,
        private coffeeLabService: CoffeeLabService,
        private cdr: ChangeDetectorRef,
    ) {
        super(resizeService);
        this.slug = this.activatedRoute.parent.snapshot.params.slug;

        this.activatedRoute.data.subscribe((data) => {
            this.postType = data.postType;
        });
    }

    ngOnInit(): void {
        this.getPosts();
        if (this.postType === PostType.QA) {
            this.getAllTopWriters();
        }
    }

    getPosts(): void {
        const params = {
            sort_by:
                this.postType === PostType.QA
                    ? this.sortBy === 'most_answered'
                        ? 'most_answered'
                        : 'posted_at'
                    : 'created_at',

            sort_order:
                this.postType === PostType.QA
                    ? this.sortBy === 'most_answered'
                        ? 'desc'
                        : this.sortBy === 'latest' || !this.sortBy
                        ? 'desc'
                        : 'asc'
                    : this.selectedOrder === 'latest' || !this.selectedOrder
                    ? 'desc'
                    : 'asc',
            is_consumer: this.filterBy,
            translations_available: this.isAvailableTranslation,
            publish: true,
            category_slug: this.slug,
            page: this.page,
            per_page: this.rows,
        };
        this.isLoading = true;
        this.cdr.detectChanges();
        this.coffeeLabService
            .getForumList(this.postType, {
                ...params,
            })
            .subscribe((res) => {
                if (res.success) {
                    this.posts = (this.postType === PostType.QA ? res.result?.questions : res.result) ?? [];
                    this.totalRecords = res.result_info.total_count;
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            });
    }

    getAllTopWriters() {
        this.coffeeLabService.getTopWriters({ count: 4 }).subscribe((res) => {
            if (res.success) {
                this.topWriters = res.result || [];
            }
            this.cdr.detectChanges();
        });
        this.coffeeLabService.otherCategories.subscribe((res) => {
            this.otherCategories = res;
        });
    }

    paginate(event: any) {
        this.page = event.page + 1;
        this.getPosts();
    }
}
