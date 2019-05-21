import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessKeyPage } from './access-key.page';

describe('AccessKeyPage', () => {
  let component: AccessKeyPage;
  let fixture: ComponentFixture<AccessKeyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessKeyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessKeyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
