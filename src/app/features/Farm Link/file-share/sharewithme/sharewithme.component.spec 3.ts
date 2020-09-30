import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharewithmeComponent } from './sharewithme.component';

describe('SharewithmeComponent', () => {
  let component: SharewithmeComponent;
  let fixture: ComponentFixture<SharewithmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharewithmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharewithmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
