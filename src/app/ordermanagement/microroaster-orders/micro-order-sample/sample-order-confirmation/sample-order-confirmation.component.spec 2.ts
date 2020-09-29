import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleOrderConfirmationComponent } from './sample-order-confirmation.component';

describe('SampleOrderConfirmationComponent', () => {
  let component: SampleOrderConfirmationComponent;
  let fixture: ComponentFixture<SampleOrderConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleOrderConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleOrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
