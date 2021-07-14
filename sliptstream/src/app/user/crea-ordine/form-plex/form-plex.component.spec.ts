import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlexComponent } from './form-plex.component';

describe('FormPlexComponent', () => {
  let component: FormPlexComponent;
  let fixture: ComponentFixture<FormPlexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPlexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPlexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
