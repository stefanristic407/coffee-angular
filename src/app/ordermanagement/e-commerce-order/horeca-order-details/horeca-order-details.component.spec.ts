import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorecaOrderDetailsComponent } from './horeca-order-details.component';

describe('HorecaOrderDetailsComponent', () => {
  let component: HorecaOrderDetailsComponent;
  let fixture: ComponentFixture<HorecaOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorecaOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorecaOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
