
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
// import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent extends BaseComponent implements OnInit {


  customerId: string = '';

  customer: ISeller = {
    name:'',
    category:'',
    type: '', 
    phoneNo : '',
    email:'',
    province:'',
    city:'',
    address:'',
    cnic: '',
    showroomId: localStorage.getItem('Showroom Id'),
    
  };
  selectedTabIndex: number = 0;
  category: string[] = ["DEALERSHIP", "AGENT", "CUSTOMER"];
  customerType: string[] = ["BUYER", "SELLER"];
  selectedCategory: string = ''; 
  selectedtype: string = '';
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
      field: 'phoneNo',
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
      field: 'phoneNo',
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
        // this.customerId = event.customer_id;
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
      console.log(this.customer)
      if(this.SellerForm.valid) {
        this.apiService
        .post('/customer/addCustomer', this.customer)
        .subscribe({
          next: (response) => {

            this.toast.showSuccess('New Customer Added.');
            this.closeModal();
            this.SellerForm.reset();

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
    this.apiService.get(`/customer/getCustomer/${this.customer.showroomId}/${this.category[this.selectedTabIndex]}`).subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }
}
