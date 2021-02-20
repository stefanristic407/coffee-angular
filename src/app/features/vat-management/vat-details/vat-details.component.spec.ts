import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VatDetailsComponent } from './vat-details.component';

describe('VatDetailsComponent', () => {
  let component: VatDetailsComponent;
  let fixture: ComponentFixture<VatDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
