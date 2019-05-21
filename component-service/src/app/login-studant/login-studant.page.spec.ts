import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStudantPage } from './login-studant.page';

describe('LoginStudantPage', () => {
  let component: LoginStudantPage;
  let fixture: ComponentFixture<LoginStudantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginStudantPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginStudantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
