import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousInfoComponent } from './previous-info.component';

describe('PreviousInfoComponent', () => {
  let component: PreviousInfoComponent;
  let fixture: ComponentFixture<PreviousInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
