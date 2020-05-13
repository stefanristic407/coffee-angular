import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoasterCompleteSetupComponent } from './roaster-complete-setup.component';

describe('RoasterCompleteSetupComponent', () => {
  let component: RoasterCompleteSetupComponent;
  let fixture: ComponentFixture<RoasterCompleteSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoasterCompleteSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoasterCompleteSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
