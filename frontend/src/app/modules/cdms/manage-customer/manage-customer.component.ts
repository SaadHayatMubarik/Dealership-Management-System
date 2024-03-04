
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { ISeller} from '../../interfaces';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';


@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent extends BaseComponent implements OnInit {

  customer: ISeller = {

    name:'',
    category:'',
    phone_no:0,
    email:'',
    province:'',
    City:'',
    address:'',
    showroomId: localStorage.getItem('Showroom Id'),
    
  };

  
  selectedTabIndex: number = 0;
  sellerCategory: string[] = ["CUSTOMER", "AGENT", "DEALERSHIP"];
  selectedSellerCategory: string = '';

  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];



  constructor(private apiService : ApiHelperService, private toast : ToastService )
  {
    super();
  }

  ngOnInit() {
   

  }

  onTabChange(event: any) {
    this.selectedTabIndex = event.index;
    
  }
}
