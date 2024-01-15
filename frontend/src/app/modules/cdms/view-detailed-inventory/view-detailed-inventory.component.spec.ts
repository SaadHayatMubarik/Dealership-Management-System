import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailedInventoryComponent } from './view-detailed-inventory.component';

describe('ViewDetailedInventoryComponent', () => {
  let component: ViewDetailedInventoryComponent;
  let fixture: ComponentFixture<ViewDetailedInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDetailedInventoryComponent]
    });
    fixture = TestBed.createComponent(ViewDetailedInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
