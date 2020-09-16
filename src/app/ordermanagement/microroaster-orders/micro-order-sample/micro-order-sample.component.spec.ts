import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroOrderSampleComponent } from './micro-order-sample.component';

describe('MicroOrderSampleComponent', () => {
  let component: MicroOrderSampleComponent;
  let fixture: ComponentFixture<MicroOrderSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroOrderSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroOrderSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
