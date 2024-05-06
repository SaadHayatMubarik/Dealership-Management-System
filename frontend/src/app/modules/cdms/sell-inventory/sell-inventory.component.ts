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

  dateOfPurchase: Date | null = null;

  vehicleType : string = ''
  make : string = '' ;
  model : string = '' ;
  variant : string = '' ;
  chasisNo : string = '' ;
  engineNo : string = '' ;
  costPrice : string = '' ;
  demand : string = '' ;
  modelYear : string = '' ;
  bodyColor : string = '' ;
  status : string = '' ;
  regNo : string = '' ;
  selectedCustomer:any = '';

  
 



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
    this.sellInventoryObj.inventoryId = this.inventoryId;
    this.apiService
  .get(`/inventory/getInventoryDetails/${this.inventoryId}`)
  .subscribe(
    (data) => {
      this.vehicleDetails = data;
      this.make = this.vehicleDetails.make
      this.model = this.vehicleDetails.model
      this.variant = this.vehicleDetails.variant
      this.chasisNo = this.vehicleDetails.chasis_no
      this.engineNo = this.vehicleDetails.engine_no
      this.costPrice = this.vehicleDetails.price
      this.dateOfPurchase = new Date(this.vehicleDetails.date_of_purchase);
      this.modelYear = this.vehicleDetails.year
      this.bodyColor = this.vehicleDetails.color
      this.status = this.vehicleDetails.status
      this.regNo = this.vehicleDetails.reg_no
      this.demand = this.vehicleDetails.demand
 
    }
  );
  }


  getCustomersByType() {
    this.apiService
    .get(`/customer/getCustomer/${this.showroomId}/${this. SelectedCategory}/${this.customerType}`)
    .subscribe({
      next: (response) => {
        // console.log(response);
        this.customers = response;
       
      },
      complete: () => {
      }
    })
}

onCustomerSelectionChange(): void {
  if (this.selectedCustomer) {
      // Assuming the customer object has an 'id' property
     this.buyerId=  this.selectedCustomer.customer_id;
     

  }
  this.getCustomersById();  
}


customersDetails: any;
phone_no : string = '' ;
email : string = '' ;
city : string = '' ;
address : string = '' ;


getCustomersById(){
  this.sellInventoryObj.buyerId = this.buyerId;
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
sellInventoryObj: ISellInventory =
{
  inventoryId: 0, 
  vehicleType: '',
  vehicleMake: '',
  vehicleModel :'',
  vehicleVariant : '',
  modelYear : 0,
  vehicleChasisNo:  '',
  costPrice :0,
  demand : 0,
  dateOfPurchase: '',
  dateOfSale:'',
  bodyColor : '',
  engineNo :  '',
  comments: '',
  grade: 0,
  status:this.vehicleStatus,
  regNo: '',
  mileage: 0,
  sellingPrice:'', 
  buyerId:0
}

sellInventory()
{

  // if (this.BuyerForm.valid){ 

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
