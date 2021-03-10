import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRequestsTableComponent } from './api-requests-table.component';

describe('ApiRequestsTableComponent', () => {
  let component: ApiRequestsTableComponent;
  let fixture: ComponentFixture<ApiRequestsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiRequestsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
