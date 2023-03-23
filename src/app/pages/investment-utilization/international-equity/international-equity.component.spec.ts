import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalEquityComponent } from './international-equity.component';

describe('InternationalEquityComponent', () => {
  let component: InternationalEquityComponent;
  let fixture: ComponentFixture<InternationalEquityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalEquityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalEquityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
