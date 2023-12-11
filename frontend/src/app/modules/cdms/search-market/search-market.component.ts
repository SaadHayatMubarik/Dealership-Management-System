import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';

@Component({
  selector: 'app-search-market',
  templateUrl: './search-market.component.html',
  styleUrls: ['./search-market.component.scss']
})
export class SearchMarketComponent extends BaseComponent implements OnInit{


  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];


  ngOnInit() {

    this.columns = [
      {
        field: '',
        fieldTitle: 'Showroom Name',
      },
      {
        field: '',
        fieldTitle: 'Showroom State',
      },
      {
        field: '',
        fieldTitle: 'Showroom City',
      },
      {
        field: '',
        fieldTitle: 'Showroom Address',
      },
      
    ];
    this.actions = [
     
      {
        label: 'View',
        icon: 'pi pi-file-view',
        command: () => {},
      },
    ];
  }

}
