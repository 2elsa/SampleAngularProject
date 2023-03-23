import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalAssociationComponent } from './professional-association.component';

describe('ProfessionalAssociationComponent', () => {
  let component: ProfessionalAssociationComponent;
  let fixture: ComponentFixture<ProfessionalAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalAssociationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
