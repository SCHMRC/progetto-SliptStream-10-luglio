import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormColorprintComponent } from './form-colorprint.component';

describe('FormColorprintComponent', () => {
  let component: FormColorprintComponent;
  let fixture: ComponentFixture<FormColorprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormColorprintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormColorprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
