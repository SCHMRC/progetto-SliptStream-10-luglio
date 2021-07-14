import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAdesivoComponent } from './form-adesivo.component';

describe('FormAdesivoComponent', () => {
  let component: FormAdesivoComponent;
  let fixture: ComponentFixture<FormAdesivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAdesivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAdesivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
