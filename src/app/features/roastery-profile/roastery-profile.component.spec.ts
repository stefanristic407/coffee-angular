import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoasteryProfileComponent } from './roastery-profile.component';

describe('RoasteryProfileComponent', () => {
  let component: RoasteryProfileComponent;
  let fixture: ComponentFixture<RoasteryProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoasteryProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoasteryProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
