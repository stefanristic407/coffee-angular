import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoasterOnboardComponent } from './roaster-onboard.component';

describe('RoasterOnboardComponent', () => {
  let component: RoasterOnboardComponent;
  let fixture: ComponentFixture<RoasterOnboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoasterOnboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoasterOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
