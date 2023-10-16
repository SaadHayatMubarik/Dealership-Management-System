import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DataTableColumn } from '../../interfaces/common';
import { TreeTable } from 'primeng/treetable';

@Component({
  selector: 'app-treetable',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.scss']
})
export class TreetableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() data: TreeNode[] = [];
  @Input() paginator: boolean = true;
  @Input() rows: number = 10;
  @Input() showCurrentPageReport: boolean = true;
  @Input() rowsPerPageOptions: number[] = [25, 50, 100];
  @Input() globalFilterFields: string[] = [];
  @Input() globalFilterCondition:string = 'contains'

  @Input() cols: DataTableColumn[] = [];

  filterGlobal(table: TreeTable, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, this.globalFilterCondition);
  }





}
