import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateReviewsComponent } from './estate-reviews.component';

describe('EstateReviewsComponent', () => {
  let component: EstateReviewsComponent;
  let fixture: ComponentFixture<EstateReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
