import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateInfoComponent } from './estate-info.component';

describe('EstateInfoComponent', () => {
  let component: EstateInfoComponent;
  let fixture: ComponentFixture<EstateInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
