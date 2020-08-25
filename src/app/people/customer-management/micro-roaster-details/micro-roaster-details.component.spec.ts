import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroRoasterDetailsComponent } from './micro-roaster-details.component';

describe('MicroRoasterDetailsComponent', () => {
  let component: MicroRoasterDetailsComponent;
  let fixture: ComponentFixture<MicroRoasterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroRoasterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroRoasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
