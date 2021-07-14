import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElencoOrdiniCompletiComponent } from './elenco-ordini-completi.component';

describe('ElencoOrdiniCompletiComponent', () => {
  let component: ElencoOrdiniCompletiComponent;
  let fixture: ComponentFixture<ElencoOrdiniCompletiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElencoOrdiniCompletiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElencoOrdiniCompletiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
