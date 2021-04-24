import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerContactComponent } from './partner-contact.component';

describe('PartnerContactComponent', () => {
  let component: PartnerContactComponent;
  let fixture: ComponentFixture<PartnerContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
