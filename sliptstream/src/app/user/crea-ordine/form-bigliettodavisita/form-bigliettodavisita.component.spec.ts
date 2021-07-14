import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBigliettodavisitaComponent } from './form-bigliettodavisita.component';

describe('FormBigliettodavisitaComponent', () => {
  let component: FormBigliettodavisitaComponent;
  let fixture: ComponentFixture<FormBigliettodavisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBigliettodavisitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBigliettodavisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
