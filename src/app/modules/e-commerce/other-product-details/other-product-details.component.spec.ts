import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherProductDetailsComponent } from './other-product-details.component';

describe('OtherProductDetailsComponent', () => {
  let component: OtherProductDetailsComponent;
  let fixture: ComponentFixture<OtherProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherProductDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
