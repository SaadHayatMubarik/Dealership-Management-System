
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

  customerId: string = '';
  selectedTabIndex: number = 0;
  sellerCategory: string[] = ["DEALERSHIP", "AGENT", "CUSTOMER"];
  selectedSellerCategory: string = '';

  columns: DataTableColumn[] = [];
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

  // onSubmit(){
  //   {
  //     this.apiService
  //       .post('/investor/addInvestor', this.investor)
  //       .subscribe({
  //         next: (response) => {
  //           console.log(this.investor);
  //           console.log(response);
  //           this.closeModal();
  //           this.toast.showSuccess('New User.');
  //           this.getinvestors();
  //         },
  //         error: () => {
  //           this.toast.showError();
  //           console.log(this.investor);
  //         },
  //       });
  //   }
  // }

  getCustomer(){
    console.log(this.customer.category);
    this.apiService.get(`/customer/getCustomer/${this.customer.showroomId}/${this.sellerCategory[this.selectedTabIndex]}`).subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }
}
