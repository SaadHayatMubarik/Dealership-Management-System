/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TreetableComponent } from './treetable.component';

describe('TreetableComponent', () => {
  let component: TreetableComponent;
  let fixture: ComponentFixture<TreetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
