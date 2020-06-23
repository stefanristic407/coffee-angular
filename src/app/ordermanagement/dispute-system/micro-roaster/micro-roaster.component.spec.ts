import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroRoasterComponent } from './micro-roaster.component';

describe('MicroRoasterComponent', () => {
  let component: MicroRoasterComponent;
  let fixture: ComponentFixture<MicroRoasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroRoasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroRoasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
