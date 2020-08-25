import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoasterDashboardComponent } from './roaster-dashboard.component';

describe('RoasterDashboardComponent', () => {
  let component: RoasterDashboardComponent;
  let fixture: ComponentFixture<RoasterDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoasterDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoasterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
