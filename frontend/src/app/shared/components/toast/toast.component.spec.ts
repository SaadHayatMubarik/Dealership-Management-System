import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastControlComponent } from './toast.component';

describe('ToastControlComponent', () => {
  let component: ToastControlComponent;
  let fixture: ComponentFixture<ToastControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastControlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
