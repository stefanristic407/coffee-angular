import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoastingProfilesComponent } from './roasting-profiles.component';

describe('RoastingProfilesComponent', () => {
  let component: RoastingProfilesComponent;
  let fixture: ComponentFixture<RoastingProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoastingProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoastingProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
