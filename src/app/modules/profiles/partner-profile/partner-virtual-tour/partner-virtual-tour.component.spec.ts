import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerVirtualTourComponent } from './partner-virtual-tour.component';

describe('PartnerVirtualTourComponent', () => {
  let component: PartnerVirtualTourComponent;
  let fixture: ComponentFixture<PartnerVirtualTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerVirtualTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerVirtualTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
