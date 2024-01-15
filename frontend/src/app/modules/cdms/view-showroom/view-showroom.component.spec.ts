import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShowroomComponent } from './view-showroom.component';

describe('ViewShowroomComponent', () => {
  let component: ViewShowroomComponent;
  let fixture: ComponentFixture<ViewShowroomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewShowroomComponent]
    });
    fixture = TestBed.createComponent(ViewShowroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
