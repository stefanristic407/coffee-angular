import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VatB2bComponent } from './vat-b2b.component';

describe('VatB2bComponent', () => {
  let component: VatB2bComponent;
  let fixture: ComponentFixture<VatB2bComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatB2bComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatB2bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
