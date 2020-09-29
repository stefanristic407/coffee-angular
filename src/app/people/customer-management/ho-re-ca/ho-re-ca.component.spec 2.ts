import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoReCaComponent } from './ho-re-ca.component';

describe('HoReCaComponent', () => {
  let component: HoReCaComponent;
  let fixture: ComponentFixture<HoReCaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoReCaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoReCaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
