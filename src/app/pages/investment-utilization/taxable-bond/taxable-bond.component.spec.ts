import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxableBondComponent } from './taxable-bond.component';

describe('TaxableBondComponent', () => {
  let component: TaxableBondComponent;
  let fixture: ComponentFixture<TaxableBondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxableBondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxableBondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
