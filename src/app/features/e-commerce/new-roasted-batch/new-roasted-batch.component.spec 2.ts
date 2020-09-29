import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRoastedBatchComponent } from './new-roasted-batch.component';

describe('NewRoastedBatchComponent', () => {
  let component: NewRoastedBatchComponent;
  let fixture: ComponentFixture<NewRoastedBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRoastedBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRoastedBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
