import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroRoasterOrdersComponent } from './micro-roaster-orders.component';

describe('MicroRoasterOrdersComponent', () => {
  let component: MicroRoasterOrdersComponent;
  let fixture: ComponentFixture<MicroRoasterOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroRoasterOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroRoasterOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
