import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFrequencyComponent } from './contact-frequency.component';

describe('ContactFrequencyComponent', () => {
  let component: ContactFrequencyComponent;
  let fixture: ComponentFixture<ContactFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactFrequencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
