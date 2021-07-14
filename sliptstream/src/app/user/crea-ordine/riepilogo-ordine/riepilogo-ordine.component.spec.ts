import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiepilogoOrdineComponent } from './riepilogo-ordine.component';

describe('RiepilogoOrdineComponent', () => {
  let component: RiepilogoOrdineComponent;
  let fixture: ComponentFixture<RiepilogoOrdineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiepilogoOrdineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiepilogoOrdineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
