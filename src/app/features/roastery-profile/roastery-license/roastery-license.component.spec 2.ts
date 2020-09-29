import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoasteryLicenseComponent } from './roastery-license.component';

describe('RoasteryLicenseComponent', () => {
  let component: RoasteryLicenseComponent;
  let fixture: ComponentFixture<RoasteryLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoasteryLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoasteryLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
