import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorecaOrdersComponent } from './horeca-orders.component';

describe('HorecaOrdersComponent', () => {
  let component: HorecaOrdersComponent;
  let fixture: ComponentFixture<HorecaOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorecaOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorecaOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
