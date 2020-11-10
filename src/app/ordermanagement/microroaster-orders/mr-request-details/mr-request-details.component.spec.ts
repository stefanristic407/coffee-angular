import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MrRequestDetailsComponent } from './mr-request-details.component';

describe('MrRequestDetailsComponent', () => {
  let component: MrRequestDetailsComponent;
  let fixture: ComponentFixture<MrRequestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MrRequestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
