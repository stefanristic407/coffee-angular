import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerAboutComponent } from './partner-about.component';

describe('PartnerAboutComponent', () => {
  let component: PartnerAboutComponent;
  let fixture: ComponentFixture<PartnerAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
