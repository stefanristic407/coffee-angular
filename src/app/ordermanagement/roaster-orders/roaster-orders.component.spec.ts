import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoasterOrdersComponent } from './roaster-orders.component';

describe('RoasterOrdersComponent', () => {
  let component: RoasterOrdersComponent;
  let fixture: ComponentFixture<RoasterOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoasterOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoasterOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
