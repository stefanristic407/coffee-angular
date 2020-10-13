import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestedComponent } from './service-requested.component';

describe('ServiceRequestedComponent', () => {
  let component: ServiceRequestedComponent;
  let fixture: ComponentFixture<ServiceRequestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
