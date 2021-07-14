import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPrespaziatoComponent } from './form-prespaziato.component';

describe('FormPrespaziatoComponent', () => {
  let component: FormPrespaziatoComponent;
  let fixture: ComponentFixture<FormPrespaziatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPrespaziatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPrespaziatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
