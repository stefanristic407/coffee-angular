import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoasterQuickSetupComponent } from './roaster-quick-setup.component';

describe('RoasterQuickSetupComponent', () => {
  let component: RoasterQuickSetupComponent;
  let fixture: ComponentFixture<RoasterQuickSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoasterQuickSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoasterQuickSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
