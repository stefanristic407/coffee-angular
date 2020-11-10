import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VatManagementComponent } from './vat-management.component';

describe('VatManagementComponent', () => {
  let component: VatManagementComponent;
  let fixture: ComponentFixture<VatManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
