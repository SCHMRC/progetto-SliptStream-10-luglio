import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElencoOrdiniComponent } from './elenco-ordini.component';

describe('ElencoOrdiniComponent', () => {
  let component: ElencoOrdiniComponent;
  let fixture: ComponentFixture<ElencoOrdiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElencoOrdiniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElencoOrdiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
