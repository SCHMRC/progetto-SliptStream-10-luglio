import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneBozzeComponent } from './gestione-bozze.component';

describe('GestioneBozzeComponent', () => {
  let component: GestioneBozzeComponent;
  let fixture: ComponentFixture<GestioneBozzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestioneBozzeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneBozzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
