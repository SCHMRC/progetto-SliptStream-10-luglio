import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCartaComponent } from './form-carta.component';

describe('FormCartaComponent', () => {
  let component: FormCartaComponent;
  let fixture: ComponentFixture<FormCartaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCartaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
