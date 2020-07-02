import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateDetailsListComponent } from './estate-details-list.component';

describe('EstateDetailsListComponent', () => {
  let component: EstateDetailsListComponent;
  let fixture: ComponentFixture<EstateDetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateDetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
