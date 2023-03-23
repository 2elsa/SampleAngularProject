import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCertificationComponent } from './registration-certification.component';

describe('RegistrationCertificationComponent', () => {
  let component: RegistrationCertificationComponent;
  let fixture: ComponentFixture<RegistrationCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationCertificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
