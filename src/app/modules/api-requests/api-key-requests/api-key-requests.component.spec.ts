import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeyRequestsComponent } from './api-key-requests.component';

describe('ApiKeyRequestsComponent', () => {
  let component: ApiKeyRequestsComponent;
  let fixture: ComponentFixture<ApiKeyRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiKeyRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiKeyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
