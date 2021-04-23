import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateAboutComponent } from './estate-about.component';

describe('EstateAboutComponent', () => {
  let component: EstateAboutComponent;
  let fixture: ComponentFixture<EstateAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
