import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDibondComponent } from './form-dibond.component';

describe('FormDibondComponent', () => {
  let component: FormDibondComponent;
  let fixture: ComponentFixture<FormDibondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDibondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDibondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
