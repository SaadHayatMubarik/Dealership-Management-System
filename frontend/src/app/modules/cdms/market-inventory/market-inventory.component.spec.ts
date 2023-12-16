import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketInventoryComponent } from './market-inventory.component';

describe('MarketInventoryComponent', () => {
  let component: MarketInventoryComponent;
  let fixture: ComponentFixture<MarketInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketInventoryComponent]
    });
    fixture = TestBed.createComponent(MarketInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
