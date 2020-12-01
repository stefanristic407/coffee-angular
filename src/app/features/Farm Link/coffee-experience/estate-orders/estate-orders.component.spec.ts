import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateOrdersComponent } from './estate-orders.component';

describe('EstateOrdersComponent', () => {
  let component: EstateOrdersComponent;
  let fixture: ComponentFixture<EstateOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
