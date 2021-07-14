import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOrdineComponent } from './item-ordine.component';

describe('ItemOrdineComponent', () => {
  let component: ItemOrdineComponent;
  let fixture: ComponentFixture<ItemOrdineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemOrdineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOrdineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
