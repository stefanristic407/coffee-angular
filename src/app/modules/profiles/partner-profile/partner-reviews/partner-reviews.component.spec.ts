import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerReviewsComponent } from './partner-reviews.component';

describe('PartnerReviewsComponent', () => {
  let component: PartnerReviewsComponent;
  let fixture: ComponentFixture<PartnerReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
