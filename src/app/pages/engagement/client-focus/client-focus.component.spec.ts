import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFocusComponent } from './client-focus.component';

describe('ClientFocusComponent', () => {
  let component: ClientFocusComponent;
  let fixture: ComponentFixture<ClientFocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientFocusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
