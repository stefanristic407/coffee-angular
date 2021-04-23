import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateContactComponent } from './estate-contact.component';

describe('EstateContactComponent', () => {
  let component: EstateContactComponent;
  let fixture: ComponentFixture<EstateContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
