import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewRatingsComponent } from './overview-ratings.component';

describe('OverviewRatingsComponent', () => {
  let component: OverviewRatingsComponent;
  let fixture: ComponentFixture<OverviewRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
