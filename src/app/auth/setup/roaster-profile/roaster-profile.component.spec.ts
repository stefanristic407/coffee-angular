import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoasterProfileComponent } from './roaster-profile.component';

describe('RoasterProfileComponent', () => {
  let component: RoasterProfileComponent;
  let fixture: ComponentFixture<RoasterProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoasterProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoasterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
