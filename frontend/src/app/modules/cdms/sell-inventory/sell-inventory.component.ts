import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { NgForm } from '@angular/forms';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ActivatedRoute } from '@angular/router';

import { ToastService } from 'src/app/shared/services/toast.service';

import { Router } from '@angular/router';

import { ISellInventory } from '../../interfaces/inventory';



import {
  IObject
} from 'src/app/shared/interfaces/common';


@Component({
  selector: 'app-sell-inventory',
  templateUrl: './sell-inventory.component.html',
  styleUrls: ['./sell-inventory.component.scss']
})
export class SellInventoryComponent extends BaseComponent implements OnInit{


  data: IObject[] = [];
  inventoryId : number = 0;
  vehicleDetails: any = '';
  showroomId = localStorage.getItem("Showroom Id");
  activeTabIndex = 0; // Track current active tab index
  showSecondTab = false; // Initially disable the second tab
  customerType: string = 'BUYER'
  BuyerCategory: string[] = ["CUSTOMER", "AGENT", "DEALERSHIP"];
  SelectedCategory:string = '';
  customers: any[] = []
  buyerId: number = 0;
  sellingPrice:number=0;
  vehicleStatus: string = 'SOLD'
  dateofsale: string ='';



  constructor(private apiService:ApiHelperService, 
     private route: ActivatedRoute,
     private toast: ToastService,
     private router: Router){
    super();
  }


  ngOnInit()
  {

    this.route.params.subscribe(params => {
      this.inventoryId = params['inventoryId']; 
      this.getvehicleDetail();
    
    });

  }

  // date_of_purchase: Date | null = null;

  // vehicleType : string = ''
  // make : string = '' ;
  // model : string = '' ;
  // variant : string = '' ;
  // chasis_no : string = '' ;
  // engine_no : string = '' ;
  // price : string = '' ;
  // demand : string = '' ;
  // year : string = '' ;
  // color : string = '' ;
  // status : string = '' ;
  // reg_no : string = '' ;
  selectedCustomer:any = '';

  
  sellInventoryObj: ISellInventory =
  {
    inventory_id: 0, 
    vehicleType: '',
    make: '',
    model :'',
    variant : '',
    year : 0,
    chasis_no:  '',
    price :0,
    demand : 0,
    date_of_purchase: '',
    date_of_sale:'',
    color : '',
    engine_no :  '',
    comments: '',
    grade: 0,
    status:this.vehicleStatus,
    reg_no: '',
    mileage: 0,
    selling_price:'', 
    buyer_id:0
  }



  @ViewChild('vehicle') Vehicle!: NgForm;
  @ViewChild('BuyerForm') BuyerForm!: NgForm;
  

  onNext(){
    if(this.Vehicle.valid)
    {
          this.activeTabIndex = 1;
          this.showSecondTab = true;
    }
  
    else {
      this.toast.showError("Please fill all the required fields");
    }
    }

  getvehicleDetail(){
    this.sellInventoryObj.inventory_id = this.inventoryId;
    this.apiService
  .get(`/inventory/getInventoryDetails/${this.inventoryId}`)
  .subscribe(
    (data) => {
      this.vehicleDetails = data;
      this.sellInventoryObj.make = this.vehicleDetails.make
      this.sellInventoryObj.model = this.vehicleDetails.model
      this.sellInventoryObj.variant = this.vehicleDetails.variant
      this.sellInventoryObj.chasis_no = this.vehicleDetails.chasis_no
      this.sellInventoryObj.engine_no = this.vehicleDetails.engine_no
      this.sellInventoryObj.price = this.vehicleDetails.price
      this.sellInventoryObj.date_of_purchase = new Date(this.vehicleDetails.date_of_purchase);
      this.sellInventoryObj.year = this.vehicleDetails.year
      this.sellInventoryObj.color = this.vehicleDetails.color
      this.sellInventoryObj.status = this.vehicleDetails.status
      this.sellInventoryObj.reg_no = this.vehicleDetails.reg_no
      this.sellInventoryObj.demand = this.vehicleDetails.demand
      this.sellInventoryObj.mileage = this.vehicleDetails.mileage
      this.sellInventoryObj.grade = this.vehicleDetails.grade
      this.selectedCustomer.comments = this.vehicleDetails.comments
 
    }
  );
  }


  getCustomersByType() {
    this.apiService
    .get(`/customer/getCustomer/${this.showroomId}/${this. SelectedCategory}/${this.customerType}`)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.customers = response;
       
      },
      complete: () => {
      }
    })
}

onCustomerSelectionChange(): void {
  if (this.selectedCustomer) {
      // Assuming the customer object has an 'id' property
     this.buyerId=  this.selectedCustomer.customer_and_investor_id;

  }
  this.getCustomersById();  
}


customersDetails: any;
phone_no : string = '' ;
email : string = '' ;
city : string = '' ;
address : string = '' ;


getCustomersById(){
  this.sellInventoryObj.buyer_id = this.buyerId;
  // console.log(this.buyerId);
  this.apiService
  .get(`/customer/getCustomerDetails/${this.buyerId}`)
  .subscribe({
    next: (response: IObject[]) => {
      console.log(response);
      this.customersDetails = response;
      this.phone_no = this.customersDetails.phoneNo;
      this.email = this.customersDetails.email;
      this.city = this.customersDetails.city;
      this.address = this.customersDetails.address;
    },
    error: () => {
      this.toast.showError('Server Error!');
    }
  })
}


sellInventory()
{
this.sellInventoryObj.status = 'SOLD';
  // if (this.BuyerForm.valid){ 
    // console.log(this.sellInventoryObj)
    this.apiService
    .put('/inventory/updateInventory/sellInventory', this.sellInventoryObj)
    .subscribe({
      next: (response) => {
        this.router.navigate(['/add-inventory']);
        this.toast.showSuccess('Inventory Sold');
      },
      error: () => {
        this.toast.showError('Error Occured. Inventory Not Deleted');
      },
    });
  // }
  // else{
  //   this.toast.showError("Please fill all the required fields");
  // }



}
}
