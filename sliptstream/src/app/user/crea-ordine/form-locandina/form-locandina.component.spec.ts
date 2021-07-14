import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLocandinaComponent } from './form-locandina.component';

describe('FormLocandinaComponent', () => {
  let component: FormLocandinaComponent;
  let fixture: ComponentFixture<FormLocandinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLocandinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLocandinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
