import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentUtilizationComponent } from './investment-utilization.component';

describe('InvestmentUtilizationComponent', () => {
  let component: InvestmentUtilizationComponent;
  let fixture: ComponentFixture<InvestmentUtilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentUtilizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
