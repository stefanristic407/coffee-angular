import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateTableComponent } from './estate-table.component';

describe('EstateTableComponent', () => {
  let component: EstateTableComponent;
  let fixture: ComponentFixture<EstateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
