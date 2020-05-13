import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoasterOnboardingComponent } from './roaster-onboarding.component';

describe('RoasterOnboardingComponent', () => {
  let component: RoasterOnboardingComponent;
  let fixture: ComponentFixture<RoasterOnboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoasterOnboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoasterOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
