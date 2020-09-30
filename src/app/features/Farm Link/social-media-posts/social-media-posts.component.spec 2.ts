import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaPostsComponent } from './social-media-posts.component';

describe('SocialMediaPostsComponent', () => {
  let component: SocialMediaPostsComponent;
  let fixture: ComponentFixture<SocialMediaPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediaPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
