import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MrOrdersComponent } from './mr-orders.component';

describe('MrOrdersComponent', () => {
  let component: MrOrdersComponent;
  let fixture: ComponentFixture<MrOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MrOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
