
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

      },
    },
    {
      label: 'Update',
      icon: 'pi pi-pencil',
      command: (event) => {
        this.customerId = event.customer_id;
       console.log(this.customerId);
        this.updateSidebarVisible = true;
        this.getCustomerById();

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
   
    this.apiService.get(`/customer/getCustomer/${this.customer.showroomId}/${this.category[this.selectedTabIndex]}`).subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }

  
  customerById:any;

  customer_category: string = '';
  customer_name: string = '';
  customer_type: string = '';
  customer_email: string = '';
  customer_phoneNo: string = '';
  customer_cnic: string = '';
  customer_address: string = '';
  customer_city: string = '';
  customer_province: string = '';


  getCustomerById(){
    this.apiService.get(`/customer/getCustomerDetails/${this.customerId}`).subscribe((data) => {
      console.log(data);
      this.customerById = data;

      this.customer_category = this.customerById.catagory;
      this.customer_name = this.customerById.name;
      this.customer_phoneNo = this.customerById.phoneNo;
      this.customer_email = this.customerById.email;
      this.customer_province = this.customerById.province;
      this.customer_city = this.customerById.city;
      this.customer_address = this.customerById.address;
      this.customer_type = this.customerById.type;
      this.customer_cnic = this.customerById.cnic;
      
    
    });

  }
}

