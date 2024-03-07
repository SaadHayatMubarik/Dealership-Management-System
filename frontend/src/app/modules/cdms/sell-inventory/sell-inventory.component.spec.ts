import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellInventoryComponent } from './sell-inventory.component';

describe('SellInventoryComponent', () => {
  let component: SellInventoryComponent;
  let fixture: ComponentFixture<SellInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellInventoryComponent]
    });
    fixture = TestBed.createComponent(SellInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
