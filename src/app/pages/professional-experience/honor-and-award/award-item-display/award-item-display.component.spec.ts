import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardItemDisplayComponent } from './award-item-display.component';

describe('AwardItemDisplayComponent', () => {
  let component: AwardItemDisplayComponent;
  let fixture: ComponentFixture<AwardItemDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardItemDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardItemDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
