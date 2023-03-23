import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredEngagementComponent } from './preferred-engagement.component';

describe('PreferredEngagementComponent', () => {
  let component: PreferredEngagementComponent;
  let fixture: ComponentFixture<PreferredEngagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferredEngagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferredEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
