import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPreorderLotComponent } from './confirm-preorder-lot.component';

describe('ConfirmPreorderLotComponent', () => {
  let component: ConfirmPreorderLotComponent;
  let fixture: ComponentFixture<ConfirmPreorderLotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPreorderLotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPreorderLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
