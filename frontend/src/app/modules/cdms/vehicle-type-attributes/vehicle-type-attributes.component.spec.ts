/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VehicleTypeAttributesComponent } from './vehicle-type-attributes.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

describe('VehicleTypeAttributesComponent', () => {
  let component: VehicleTypeAttributesComponent;
  let fixture: ComponentFixture<VehicleTypeAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTypeAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
