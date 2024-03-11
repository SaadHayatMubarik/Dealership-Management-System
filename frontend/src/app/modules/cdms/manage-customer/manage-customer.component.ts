
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

import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent extends BaseComponent implements OnInit {

  customerId: string = '';
  selectedTabIndex: number = 0;
  sellerCategory: string[] = ["DEALERSHIP", "AGENT", "CUSTOMER"];
  selectedSellerCategory: string = '';


  customer: ISeller = {
    name:'',
    category: this.selectedSellerCategory,
    phone_no:0,
    email:'',
    province:'',
    City:'',
    address:'',
    cnic:'',
    showroomId: localStorage.getItem('Showroom Id'),
    
  };

 
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

  @ViewChild('Seller') SellerForm!: NgForm;

  onTabChange(event: any) {
    this.selectedTabIndex = event.index;
    this.getCustomer();
  }

  onSubmit(){
    {
      if(this.SellerForm.valid) {
        this.apiService
        .post('', this.customer)
        .subscribe({
          next: (response) => {
            console.log(this.customer);
            console.log(response);
            this.toast.showSuccess('New Customer Added.');
            this. getCustomer();
          },
          error: () => {
            this.toast.showError('Error Occured');
            console.log(this.customer);
          },
        });
      }

      else{
        this.toast.showError('Fill all the fields')
      }
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
