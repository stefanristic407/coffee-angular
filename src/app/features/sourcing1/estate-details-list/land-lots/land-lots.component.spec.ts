import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandLotsComponent } from './land-lots.component';

describe('LandLotsComponent', () => {
  let component: LandLotsComponent;
  let fixture: ComponentFixture<LandLotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandLotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandLotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
