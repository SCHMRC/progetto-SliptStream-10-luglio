import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneOrdineComponent } from './gestione-ordine.component';

describe('GestioneOrdineComponent', () => {
  let component: GestioneOrdineComponent;
  let fixture: ComponentFixture<GestioneOrdineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestioneOrdineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneOrdineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
