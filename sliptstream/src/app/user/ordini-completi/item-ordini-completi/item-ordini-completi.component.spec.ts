import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOrdiniCompletiComponent } from './item-ordini-completi.component';

describe('ItemOrdiniCompletiComponent', () => {
  let component: ItemOrdiniCompletiComponent;
  let fixture: ComponentFixture<ItemOrdiniCompletiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemOrdiniCompletiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOrdiniCompletiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
