import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionEsatateInfoComponent } from './subscription-esatate-info.component';

describe('SubscriptionEsatateInfoComponent', () => {
  let component: SubscriptionEsatateInfoComponent;
  let fixture: ComponentFixture<SubscriptionEsatateInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionEsatateInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionEsatateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
