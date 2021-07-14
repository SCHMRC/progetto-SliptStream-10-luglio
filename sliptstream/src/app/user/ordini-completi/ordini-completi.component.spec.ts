import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdiniCompletiComponent } from './ordini-completi.component';

describe('OrdiniCompletiComponent', () => {
  let component: OrdiniCompletiComponent;
  let fixture: ComponentFixture<OrdiniCompletiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdiniCompletiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdiniCompletiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
