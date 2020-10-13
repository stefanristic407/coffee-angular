import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateMySampleComponent } from './generate-my-sample.component';

describe('GenerateMySampleComponent', () => {
  let component: GenerateMySampleComponent;
  let fixture: ComponentFixture<GenerateMySampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateMySampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateMySampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
