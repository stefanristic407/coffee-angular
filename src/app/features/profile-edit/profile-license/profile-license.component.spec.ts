import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLicenseComponent } from './profile-license.component';

describe('ProfileLicenseComponent', () => {
  let component: ProfileLicenseComponent;
  let fixture: ComponentFixture<ProfileLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
