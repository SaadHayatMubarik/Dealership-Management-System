
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
    phoneNo : '',
    email:'',
    province:'',
    city:'',
    address:'',
    cnic: '',
    showroomId: localStorage.getItem('Showroom Id'),
    
  };

  customerId: string = '';
  selectedTabIndex: number = 0;
  sellerCategory: string[] = ["DEALERSHIP", "AGENT", "CUSTOMER"];
  selectedCategory: string = '';

  columns: DataTableColumn[] = [];
  dealershipColumns: DataTableColumn[]= [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];



  constructor(private apiService : ApiHelperService, private toast : ToastService )
  {
    super();
  }

  ngOnInit() {
   this.getCustomer();

   this.columns=[
    
    {
      field: 'name',
      fieldTitle: 'Name',
    },
    {
      field: 'type',
      fieldTitle: 'Type',
    },
    {
      field: 'cnic',
      fieldTitle: 'Cnic'
    },
    {
      field: 'phone_number',
      fieldTitle: 'Phone Number'
    },
    {
      field: 'email',
      fieldTitle: 'Email'

    },
    {
      field: 'address',
      fieldTitle: 'Address'
    },
    {
      field: 'city',
      fieldTitle: 'City'

    }
   ];
   this.dealershipColumns=[
    
    {
      field: 'name',
      fieldTitle: 'Name',
    },
    {
      field: 'type',
      fieldTitle: 'Type',
    },
    // {
    //   field: 'cnic',
    //   fieldTitle: 'Cnic'
    // },
    {
      field: 'phone_number',
      fieldTitle: 'Phone Number'
    },
    {
      field: 'email',
      fieldTitle: 'Email'

    },
    {
      field: 'address',
      fieldTitle: 'Address'
    },
    {
      field: 'city',
      fieldTitle: 'City'

    }
   ];
   this.actions = [
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: (event) => {

      },
    },
    {
      label: 'Update',
      icon: 'pi pi-pencil',
      command: (event) => {
        this.customerId = event.customer_id;
        // this.updateSidebarVisible = true;
      },
    }
   ];

  }

  onTabChange(event: any) {
    this.selectedTabIndex = event.index;
    this.getCustomer();
  }

  onSubmit(){
    {
      this.apiService
        .post('/customer/addCustomer', this.customer)
        .subscribe({
          next: (response) => {
            // console.log(this.investor);
            console.log(response);
            this.closeModal();
            this.toast.showSuccess('New User.');
            this.getCustomer();
          },
          error: () => {
            this.toast.showError();
            // console.log(this.investor);
          },
        });
    }
  }

  getCustomer(){
    console.log(this.customer.category);
    this.apiService.get(`/customer/getCustomer/${this.customer.showroomId}/${this.sellerCategory[this.selectedTabIndex]}`).subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }
}
