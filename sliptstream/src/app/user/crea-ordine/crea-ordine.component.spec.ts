import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaOrdineComponent } from './crea-ordine.component';

describe('CreaOrdineComponent', () => {
  let component: CreaOrdineComponent;
  let fixture: ComponentFixture<CreaOrdineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreaOrdineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaOrdineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
