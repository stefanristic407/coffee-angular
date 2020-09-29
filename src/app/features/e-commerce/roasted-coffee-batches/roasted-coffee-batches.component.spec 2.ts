import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoastedCoffeeBatchesComponent } from './roasted-coffee-batches.component';

describe('RoastedCoffeeBatchesComponent', () => {
  let component: RoastedCoffeeBatchesComponent;
  let fixture: ComponentFixture<RoastedCoffeeBatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoastedCoffeeBatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoastedCoffeeBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
