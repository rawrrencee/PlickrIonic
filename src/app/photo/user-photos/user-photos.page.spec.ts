import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPhotosPage } from './user-photos.page';

describe('UserPhotosPage', () => {
  let component: UserPhotosPage;
  let fixture: ComponentFixture<UserPhotosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPhotosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPhotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
