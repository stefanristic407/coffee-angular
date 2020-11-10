import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VatMicroRoasterComponent } from './vat-micro-roaster.component';

describe('VatMicroRoasterComponent', () => {
  let component: VatMicroRoasterComponent;
  let fixture: ComponentFixture<VatMicroRoasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatMicroRoasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatMicroRoasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
