import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplePriceComponent } from './sample-price.component';

describe('SamplePriceComponent', () => {
  let component: SamplePriceComponent;
  let fixture: ComponentFixture<SamplePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
