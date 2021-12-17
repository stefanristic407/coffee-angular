import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoastedBatchTableComponent } from './roasted-batch-table.component';

describe('RoastedBatchTableComponent', () => {
  let component: RoastedBatchTableComponent;
  let fixture: ComponentFixture<RoastedBatchTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoastedBatchTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoastedBatchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
