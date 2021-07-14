import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVolantinoComponent } from './form-volantino.component';

describe('FormVolantinoComponent', () => {
  let component: FormVolantinoComponent;
  let fixture: ComponentFixture<FormVolantinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVolantinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVolantinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
