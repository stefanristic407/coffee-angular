import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitatorOrdersComponent } from './facilitator-orders.component';

describe('FacilitatorOrdersComponent', () => {
  let component: FacilitatorOrdersComponent;
  let fixture: ComponentFixture<FacilitatorOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitatorOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitatorOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
