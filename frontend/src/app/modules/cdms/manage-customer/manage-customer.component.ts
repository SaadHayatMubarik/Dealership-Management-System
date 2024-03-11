
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

import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent extends BaseComponent implements OnInit {

<<<<<<< HEAD
  customerId: string = '';
=======
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

  // customerId: string = '';
>>>>>>> 19e34e7fe71b01eca3c2c9f9ef2825fd526cf750
  selectedTabIndex: number = 0;
  category: string[] = ["DEALERSHIP", "AGENT", "CUSTOMER"];
  customerType: string[] = ["Buyer", "Seller"];
  selectedCategory: string = '';


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

<<<<<<< HEAD
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
=======


  onSubmit(){
    {
      console.log(this.customer);
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
    // console.log(this.seller.category);
    this.apiService.get(`/customer/getCustomer/${this.customer.showroomId}/${this.category[this.selectedTabIndex]}`).subscribe((data) => {
      // console.log(data);
>>>>>>> 19e34e7fe71b01eca3c2c9f9ef2825fd526cf750
      this.data = data;
    });
  }
}
