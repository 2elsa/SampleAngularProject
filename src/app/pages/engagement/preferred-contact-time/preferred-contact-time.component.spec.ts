import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredContactTimeComponent } from './preferred-contact-time.component';

describe('PreferredContactTimeComponent', () => {
  let component: PreferredContactTimeComponent;
  let fixture: ComponentFixture<PreferredContactTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferredContactTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferredContactTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
