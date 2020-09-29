import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSubscriptionComponent } from './details-subscription.component';

describe('DetailsSubscriptionComponent', () => {
  let component: DetailsSubscriptionComponent;
  let fixture: ComponentFixture<DetailsSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
