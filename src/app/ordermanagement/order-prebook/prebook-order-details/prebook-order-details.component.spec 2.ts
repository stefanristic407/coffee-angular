import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebookOrderDetailsComponent } from './prebook-order-details.component';

describe('PrebookOrderDetailsComponent', () => {
  let component: PrebookOrderDetailsComponent;
  let fixture: ComponentFixture<PrebookOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrebookOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebookOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
