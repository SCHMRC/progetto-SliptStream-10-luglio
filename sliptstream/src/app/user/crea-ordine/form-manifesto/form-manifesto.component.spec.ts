import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormManifestoComponent } from './form-manifesto.component';

describe('FormManifestoComponent', () => {
  let component: FormManifestoComponent;
  let fixture: ComponentFixture<FormManifestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormManifestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormManifestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
