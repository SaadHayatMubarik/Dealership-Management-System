
import {
  Component, Input, OnInit
} from '@angular/core';
import { IDataTableAction, IObject } from '../../interfaces/common';
import { DataTableColumn } from './../../interfaces/common';
import { Table } from 'primeng/table';
import * as moment from 'moment';
import { CommonUtils } from '../../utils/common-utils';




@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
})
export class DatatableComponent implements OnInit {

  @Input() data: IObject[] = [];
  @Input() paginator: boolean = true;
  @Input() rows: number = 10;
  @Input() showCurrentPageReport: boolean = true;
  @Input() rowsPerPageOptions = [10, 25, 50, 100, { showAll: 'All' }];
  @Input() globalFilterFields: string[] = [];

  @Input() cols: DataTableColumn[] = [];
  @Input() actions: IDataTableAction[] = [];
  selectedItem: any;

  ngOnInit(): void {
  }

  constructor() {

  }

  filterGlobal(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  async onActionSelected(
    selectedAction: IDataTableAction,
    selectionItem?: any
  ): Promise<void> {
    if (selectedAction.command) {
      await selectedAction.command(selectionItem || this.selectedItem);
    }
  }
  parseFieldInData(obj: any, path: string, type: string) {
    const properties = path.split('.');
    let value = obj;

    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];

      if (Array.isArray(value)) {
        value = value[0][property];
      } else {
        value = value[property];
      }

      if (value === undefined || value === null) {
        break;
      }
    }

    return this.parseAccordingToDataType(value, type);
  }

  parseAccordingToDataType(value: any, type: string) {
    switch (type) {
      case 'date':
        return value ? moment(value).format('DD-MM-yyyy') : 'N/A';
      case 'month':
        return value > 0 ? CommonUtils.monthList[value - 1]['name'] : 'N/A';
      case 'boolean':
        return value ? 'Yes' : 'No';
      default:
        return value;
    }

  }





}
