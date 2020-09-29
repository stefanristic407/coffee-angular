import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorecaDetailsComponent } from './horeca-details.component';

describe('HorecaDetailsComponent', () => {
  let component: HorecaDetailsComponent;
  let fixture: ComponentFixture<HorecaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorecaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorecaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
