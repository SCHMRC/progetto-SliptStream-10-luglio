import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSemiespansoComponent } from './form-semiespanso.component';

describe('FormSemiespansoComponent', () => {
  let component: FormSemiespansoComponent;
  let fixture: ComponentFixture<FormSemiespansoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSemiespansoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSemiespansoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
