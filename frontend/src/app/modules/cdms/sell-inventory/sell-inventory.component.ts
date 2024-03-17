import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { NgForm } from '@angular/forms';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ActivatedRoute } from '@angular/router';
// import { DatePipe } from '@angular/common';



import {
  DataTableColumn,
  IDataTableAction,
  IObject,
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


  constructor(private apiService:ApiHelperService, private route: ActivatedRoute){
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
  // dateOfPurchase : string = '' ;
  modelYear : string = '' ;
  bodyColor : string = '' ;
  status : string = '' ;
  regNo : string = '' ;
  selectedCustomer:any = '';

 



  getvehicleDetail(){
    this.apiService
  .get(`/inventory/getInventoryDetails/${this.inventoryId}`)
  .subscribe(
    (data) => {
      this.vehicleDetails = data;
      console.log(data)

      // this.dateOfPurchase = this.datePipe.transform(this.vehicleDetails.date_of_purchase, 'yyyy-MM-dd');
      this.make = this.vehicleDetails.make
      this.model = this.vehicleDetails.model
      this.variant = this.vehicleDetails.variant
      this.chasisNo = this.vehicleDetails.chasis_no
      this.engineNo = this.vehicleDetails.engine_no
      this.costPrice = this.vehicleDetails.price
      // this.dateOfPurchase = this.vehicleDetails.date_of_purchase
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
     this.buyerId=  this.selectedCustomer.customer_id;
      console.log(this.buyerId);

  }
  this.getCustomersById();  
}


customersDetails: any;
phone_no : string = '' ;
email : string = '' ;
city : string = '' ;
address : string = '' ;


getCustomersById(){
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
      // this.toast.showError('Server Error!');
    }
  })
}



}
