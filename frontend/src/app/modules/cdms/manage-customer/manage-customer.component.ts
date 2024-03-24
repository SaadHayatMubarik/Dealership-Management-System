
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

import { IUpdateCustomer } from '../../interfaces/update';




@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent extends BaseComponent implements OnInit {


  customerId: number = 0;

  updateCustomer: IUpdateCustomer =
  {
    customer_id: 0,
    catagory: '',
    name: '',
    phoneNo: '',
    email: '',
    province: '',
    city: '',
    address: '',
    type: '',
    cnic: '',
  }

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
  // customerId: number = 0;   //for deleting customer
  updateSidebarVisible:boolean = false;


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
        this.customerId = event.customer_id;
        this.apiService.delete(`/customer/deleteCustomer/${this.customerId}`).subscribe({
          next: (response) => {
            this.getCustomer();
            this.toast.showSuccess("Customer has been Deleted.");
          },
          error: () => 
                {
                  this.toast.showError('Using Customer is linked with inventory. Record cant be deleted!');
                }
        })
      },
    },
    {
      label: 'Update',
      icon: 'pi pi-pencil',
      command: (event) => {
        this.customerId = event.customer_id;
        this.updateSidebarVisible = true;
        this.getCustomerById(this.customerId);

      },
    }
   ];

  }

  @ViewChild('Seller') SellerForm!: NgForm;
  @ViewChild('updatedCustomer') updateCustomerForm!:NgForm;

  onTabChange(event: any) {
    this.selectedTabIndex = event.index;
    this.getCustomer();
  }

  onSubmit(){
       
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
          },
        });
      }
      else{
        this.toast.showError('Fill all the fields')
      }
    
  }



  getCustomer(){
   
    this.apiService.get(`/customer/getCustomer/${this.customer.showroomId}/${this.category[this.selectedTabIndex]}`).subscribe((data) => {
      // console.log(data);
      this.data = data;
    });
  }

  


 


  getCustomerById(customerId: number){
    this.apiService.get(`/customer/getCustomerDetails/${customerId}`).subscribe((data : IUpdateCustomer) => {
      this.updateCustomer = data;
      // console.log(this.updateCustomer.name);
    });
  }

  //no update customer api
  update(){
    console.log(this.updateCustomer);
        this.apiService
        .put(`/customer/updateCustomer/${this.updateCustomer}`)
        .subscribe({
          next: (response) => {
            this.toast.showSuccess('New Customer Added.');
            this.closeModal();
            this.SellerForm.reset();
            this. getCustomer();
          },
          error: () => {
            this.toast.showError('Error Occured');
          },
        });
  
  }
}

