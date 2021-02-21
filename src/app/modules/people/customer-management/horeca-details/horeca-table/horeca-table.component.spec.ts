import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorecaTableComponent } from './horeca-table.component';

describe('HorecaTableComponent', () => {
  let component: HorecaTableComponent;
  let fixture: ComponentFixture<HorecaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorecaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorecaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
