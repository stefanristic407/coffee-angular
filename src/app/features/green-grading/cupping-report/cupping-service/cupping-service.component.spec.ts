import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuppingServiceComponent } from './cupping-service.component';

describe('CuppingServiceComponent', () => {
  let component: CuppingServiceComponent;
  let fixture: ComponentFixture<CuppingServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuppingServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuppingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
