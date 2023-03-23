import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorEquityComponent } from './sector-equity.component';

describe('SectorEquityComponent', () => {
  let component: SectorEquityComponent;
  let fixture: ComponentFixture<SectorEquityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectorEquityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorEquityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
