import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroRoasterStatComponent } from './micro-roaster-stat.component';

describe('MicroRoasterStatComponent', () => {
  let component: MicroRoasterStatComponent;
  let fixture: ComponentFixture<MicroRoasterStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroRoasterStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroRoasterStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
