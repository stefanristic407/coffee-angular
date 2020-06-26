import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRatingsComponent } from './review-ratings.component';

describe('ReviewRatingsComponent', () => {
  let component: ReviewRatingsComponent;
  let fixture: ComponentFixture<ReviewRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
