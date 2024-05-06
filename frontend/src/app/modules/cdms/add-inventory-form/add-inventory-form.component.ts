import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import {
  IInventory,
  IStockAttributeValue,

  IVehicleTypeAttributeDto,
} from '../../interfaces/inventory';

import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';

import { NgForm } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-add-inventory-form',
  templateUrl: './add-inventory-form.component.html',
  styleUrls: ['./add-inventory-form.component.scss'],
})
export class AddInventoryFormComponent extends BaseComponent implements OnInit {
  
  vehicleInventory: IInventory = {
    vehicleMake: '',
    vehicleModel: '',
    vehicleVariant: '',
    modelYear: 0,
    vehicleChasisNo: '',
    costPrice: 0,
    demand: 0,
    dateOfPurchase: '',
    dateOfSale: '',
    bodyColor: '',
    engineNo: '',
    grade: 0,
    status: '',
    regNo: '',
    vehicleType: '',
    comments: '',
    mileage: 0,
    showroomId: localStorage.getItem('Showroom Id'),
    value:[],
    attributeValueId:[],
    stockAttributeValue: [],
    sellerId: '',
    investor: [],
    investmentAmount: [],
    
  };


  

  activeTabIndex = 0; // Track current active tab index
  showSecondTab = false; // Initially disable the second tab
  showThirdTab = false;
  vehicleTypes: any[] = []; //to populate dropdown of vehicle type
  investors: any[] = []; // To store list of Investors for whom inventory is added
  customers: any[] = []  ;//To store list of Customers for whom  inventory is added
  customersDetails: any; //To store individual customer details
  customerType: string = 'SELLER'
  status: string[] = ['AVAILABLE','SOLD' ,'ON ORDER']; //to populate status tabs
  statusDropdown: string[] = ['AVAILABLE','ON ORDER']; //to populate status dropdown
  sliderValue: number = 0;
 
  vehicleId: any; //saving vehicle type id
  vehicleAttributes: any[] = []; //to save vehicle type attributes
  inventoryId : number = 0;
  selectedTabIndex: number = 0;
  sellerCategory: string[] = ["CUSTOMER", "AGENT", "DEALERSHIP"];
  selectedCategory: string = '';
  selectedCustomer: any = null;  
  sellerId: number = 0;
  inventoryObj: any = null;
  investorName: string = '';
  selectedOption: string = '';
  private baseurl = 'http://localhost:3000';

  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];

  uploadForm!: FormGroup;
  constructor(
    private readonly apiService: ApiHelperService,
    private toast: ToastService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder

  ) {
    super();
  }

  ngOnInit() {

    this.uploadForm = this.formBuilder.group({
      imageUpload: [[]], // Initialize imageUpload form control with an empty array
      // documentUpload: [[]] // Initialize documentUpload form control with an empty array
    });

    this.onTabChange({ index: this.selectedTabIndex });
    this.getVehicleTypes();
    this.getInvestors();
    // this.getCustomersByType();
    this.getInventory();
    // this.vehicleTypes = this.apiService.getVehicleTypes();
    // this.onVehicleTypeSelected();

    this.columns = [
      {
        field: 'vehicleChasisNo',
        fieldTitle: 'Chasiss Number',
      },
      {
        field: 'vehicleMake',
        fieldTitle: 'Make',
      },
      {
        field: 'vehicleModel',
        fieldTitle: 'Model',
      },
      {
        field: 'vehicleVariant',
        fieldTitle: 'Variant',
      },
      {
        field: 'demand',
        fieldTitle: 'Demand',
      },
    ];
    this.actions = [
      {
        label: ' Delete',
        icon: 'pi pi-trash',
        command: (event) => {
          this.inventoryId =event.inventoryId;
          this.apiService.delete(`/inventory/${this.inventoryId}`).subscribe({
            next: (response) => {
              this.toast.showSuccess(`Inventory Id: ${this.inventoryId} record deleted.`);   
              this.getInventory();
            },
            error: () => 
            {
              this.toast.showError('Cant delete Inventory');
            }
          }
            );
        },
      },
      {
        label: 'View',
        icon: 'pi pi-eye',
        command: (event) => {
          this.router.navigate(['/detail-view', event.inventoryId]);
        },
      },
      {
        label: 'Update',
        icon: 'pi pi-file-edit',
        command: (event) => {
         this.router.navigate((['/update-inventory', event.inventoryId]));
         
        },
      },
      {
        label: 'Sell',
        icon: 'pi pi-dollar',
        command: (event) => {
          this.router.navigate(['/sell-inventory', event.inventoryId]);
          // console.log(event.inventoryId);
         
        },
      },
      
      

    ];
  }

  @ViewChild('Inventory') InventoryForm!: NgForm;
  @ViewChild('vehicleUpdate') vehicleUpdate!:NgForm;  
  @ViewChild('Seller') SellerForm!: NgForm;
  @ViewChild ('upload') UploadForm!:NgForm;
  
  getVehicleTypes() {
    this.apiService
      .get(`/vehicle-type/${this.vehicleInventory.showroomId}`)
      .subscribe({
        next: (response: IObject[]) => {
          this.vehicleTypes = response;
        },
        error: () => {},
      });
  }


  getInvestors() {
        this.apiService
        .get(`/investor/getInvestor/${this.vehicleInventory.showroomId}`)
        .subscribe({
          next: (response: IObject[]) => {
            this.investors = response;
            // console.log(this.investors)
          },
          complete: () => {
          }
        })
    }


    getCustomersByType() {
      this.apiService
      .get(`/customer/getCustomer/${this.vehicleInventory.showroomId}/${this.selectedCategory}/${this.customerType}`)
      .subscribe({
        next: (response) => {
          this.customers = response;
        },
        complete: () => {
        }
      })
  }

  onCustomerSelectionChange(): void {
    if (this.selectedCustomer) {
        this.sellerId = this.selectedCustomer.customer_id;


    }
    this.getCustomersById();  
}


  phone_no : string = '' ;
  email : string = '' ;
  city : string = '' ;
  address : string = '' ;

  getCustomersById(){
    this.vehicleInventory.sellerId = this.sellerId;
    this.apiService
    .get(`/customer/getCustomerDetails/${this.sellerId}`)
    .subscribe({
      next: (response: IObject[]) => {
        // console.log(response);
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

 


  //to limit slider value from 0 to 5.
  onInputChange(event: any) {
    const inputValue = event.target.value;
    const parsedValue = parseFloat(inputValue);
    if (!isNaN(parsedValue)) {
      if (parsedValue < 0) {
        this.sliderValue = 0;
      } else if (parsedValue > 5) {
        this.sliderValue = 5;
      } else {
        this.sliderValue = parsedValue;
      }
    } else {
      this.sliderValue = 0;
    }
  }

  // Allow only numeric input and certain special keys (e.g., backspace, delete) for slider
  onKeyDown(event: any) {
    const key = event.key;
    if (key === 'Backspace' || key === 'Delete') {
      return;
    }
    if (!/^\d*\.?\d*$/.test(key)) {
      event.preventDefault();
    }
  }

  // fucntion to store vehicle type id when selecting from dropdown.
  onVehicleTypeChange(event: any) {
    if (event.value) {
      this.vehicleId = event.value;
      if (this.vehicleId.type_id) {
        this.apiService
          .get(`/vehicle-type-attribute/${this.vehicleId.type_id}`)
          .subscribe((attributes: IVehicleTypeAttributeDto[]) => {
            this.vehicleAttributes = attributes;
            // console.log(this.vehicleAttributes);
            this.vehicleInventory.stockAttributeValue = [];
            let stockAttrVals: IStockAttributeValue[] = [];
            console.log('====================================');
            attributes.forEach((vta: IVehicleTypeAttributeDto) => {
              // console.log(vta);
              stockAttrVals.push({ id: 0, value: '', inventoryInventoryId:0, multiValueAttributeMultiValueId:0, vehicleTypeAttribute: vta })
              // console.log(vta.multiVals);
            });
            console.log('====================================');
          
            this.vehicleInventory.stockAttributeValue = stockAttrVals;
          });
      } else {
        console.log("error");
      }
    }
  }

  getOptions(attribute: any) {
    // console.log('====================================');
    // console.log('attribute', attribute);
    // console.log('====================================');
    return attribute.vehicleTypeAttribute.multiValueAttributes.map(
      (mv: IObject) => mv['attribute_value']
    ) as string[];
  }

  onNext(){

    if(this.InventoryForm.valid)
    {
          this.activeTabIndex = 1;
          this.showSecondTab = true;
    }
  
    else {
      this.toast.showError("Please fill all the fields");
    }
    }


     //investors logic

 investorForms: any[] = [];

 percentageInvested: number[] = []; // Percentage invested by the investor
 amountInvested: number[] = []; // Amount invested by the investor
 totalPercentageInvested: number = 0; // Total percentage invested
 remainingPercentage: number = 100; // Remaining percentage

 addInvestorForm() {
  // Add a new form with default data
  this.investorForms.push({});
  // Initialize percentage and amount invested for the new form
  this.percentageInvested.push(0);
  this.amountInvested.push(0);
}

removeInvestorForm(index: number) {
  // Remove the form at the specified index from the array
  if (this.investorForms.length > 0) {
    this.investorForms.splice(index, 1);
    // Remove data associated with the removed form
    this.percentageInvested.splice(index, 1);
    this.amountInvested.splice(index, 1);
    // Recalculate total and remaining percentages
    this.calculateTotalPercentageInvested();
  }
}

calculateInvestment(i: number) {
  this.amountInvested[i] = (this.percentageInvested[i] / 100) * this.vehicleInventory.costPrice;
  this.vehicleInventory.investmentAmount[i] = this.amountInvested[i];
  // Recalculate total and remaining percentages
  this.calculateTotalPercentageInvested();
}

calculateTotalPercentageInvested() {
  this.totalPercentageInvested = this.percentageInvested.reduce((total, current) => total + current, 0);
  this.remainingPercentage = 100 - this.totalPercentageInvested;
}




  postInventory() {
    if (this.SellerForm.valid){ 
      this.apiService
      .postLogin('/inventory/addInventory', this.vehicleInventory)
      .subscribe({
        next: (response) => {
          this.toast.showSuccess('Add images and documents');
          // this.closeModal();
          this.inventoryObj = response;
          // this.getInventory();
          // console.log('success',this.vehicleInventory);
          // console.log(this.inventoryObj.inventory_id);
          this.activeTabIndex = 2;
          this.showThirdTab = true;
        },
        error: () => {
          this.toast.showError('Error Occurred!');
          console.log('error',this.vehicleInventory);
        },
      });
    }
    else{
      this.toast.showError("Please fill all the required fields");
    }
  }


  

    // files: FileUpload[] = [];
    // vehicleImages: File[] = [];
    // vehicleDocuments: File[] = [];
    // handleUpload(event: any, type: string) {
    //   // Extract the uploaded files from the event
    //   const uploadedFiles: any[] = event.files;
    //   if (type === 'pictures') {
    //     this.vehicleInventory.pictures = uploadedFiles.map((file: any) => file.objectURL);
    //   } else if (type === 'files') {
    //     this.vehicleInventory.files = uploadedFiles.map((file: any) => file.objectURL);
    //   }
    // }
  // private createObjectURL(file: any): string | null {
  //   if (window.URL) {
  //     return window.URL.createObjectURL(file);
  //   } else if (window.webkitURL) {
  //     return window.webkitURL.createObjectURL(file);
  //   } else {
  //     return null;
  //   }
  // }



  // handleUpload(event: any) {
  //   this.uploadedFiles = event.files;
  //   console.log('Uploaded Files:',this.uploadedFiles);
  // }
  
  // postInventory() {
  //   if (this.UploadForm.valid) { 
  //     const formData = new FormData();
  
  //     // Append form data
  //     Object.keys(this.vehicleInventory).forEach(key => {
  //       formData.append(key, this.vehicleInventory[key as keyof IInventory]);
  //     });
      
  //     // Append images
  //     this.uploadedFiles.forEach(file => {
  //       formData.append('images', file);
  //     });
  //     this.http
  //     .post<any>('/inventory/addInventory', formData)
  //     .subscribe({
  //       next: (response) => {
  //         this.toast.showSuccess('New Inventory Added');
  //         this.closeModal();
  //         this.getInventory();
  //         console.log('success', formData);
  //         console.log('success', formData);
  //       },
  //       error: () => {
  //         this.toast.showError();
  //         console.log('error', formData);
  //       },
  //     });
  //   } else {
  //     this.toast.showError("Please fill all the required fields");
  //   }
  // }
 
  onTabChange(event: any) {
    this.selectedTabIndex = event.index;
    this.getInventory();
  }

  getInventory(){
    this.apiService.get(`/inventory/getInventory/${this.vehicleInventory.showroomId}/${this.status[this.selectedTabIndex]}`).subscribe((data) => {
      this.data = data;
      // console.log(this.status[this.selectedTabIndex]);
    });
  }

  
  // postInventory() {
  //   if (this.SellerForm.valid){ 
  //     this.apiService
  //     .postLogin('/inventory/addInventory', this.vehicleInventory)
  //     .subscribe({
  //       next: (response) => {
  //         this.toast.showSuccess('Inventory added');
  //         this.closeModal();
  //         this.inventoryObj = response;
  //         this.getInventory();
  //         console.log('success',this.vehicleInventory);
  //         // console.log(this.inventoryObj.inventory_id);
  //         // this.activeTabIndex = 2;
  //         // this.showThirdTab = true;
  //       },
  //       error: () => {
  //         this.toast.showError('Error Occurred!');
  //         console.log('error',this.vehicleInventory);
  //       },
  //     });
  //   }
  //   else{
  //     this.toast.showError("Please fill all the required fields");
  //   }
  // }

 



  // uploadImage(event: any){
     
  //   const image = event.currentTarget.files[0];
  //   const formObj = new FormData();
  //   formObj.append('file', image);
  //   console.log('formData: ', formObj);
  //   debugger;
  //   this.http.post(`/picture/{inventory/pictures}/${this.inventoryObj.inventory_id}`, formObj).subscribe((response => {
  //     console.log('Upload Images:', response);
  //   }), error => {
  //     console.log('Upload Image error:', error);
  //   });
  // }

  // uploadDocuments(event:any){
  //   const file = event.currentTarget.files[0];
  //   const formObj = new FormData();
  //   formObj.append('file', file);
  //   console.log('formData: ', formObj);
  //   this.http.post(`/picture/{inventory/documents}/${this.inventoryObj.inventory_id}`, formObj).subscribe((response => {
  //     console.log('Upload Files:', response);
  //   }), error => {
  //     console.log('Upload File error:', error);
  //   });
  //   debugger;
  // }

  uploadImage(event: any){
    const files: File[] = event.target.files;
    const formObj = new FormData();
    const pictureType = 'inventory pictures'
    for(let i=0;i<files.length;i++){
      formObj.append('files', files[i]);
    }
    this.apiService.postPicture(`/picture/${pictureType}/${this.inventoryObj.inventory_id}`, formObj).subscribe((response => {
      console.log('Upload Images:', response);
    }), error => {
      console.log('Upload Image error:', error);
    });
  }

  uploadDocuments(event:any){
    const files: File[] = event.target.files;
    const formObj = new FormData();
    const pictureType = 'inventory documents'
    for(let i=0;i<files.length;i++){
      formObj.append('files', files[i]);
    }
    this.apiService.postPicture(`/picture/${pictureType}/${this.inventoryObj.inventory_id}`, formObj).subscribe((response => {
      console.log('Upload Files:', response);
    }), error => {
      console.log('Upload File error:', error);
    });
  }



   
    



// handleUpload(event: any) {
//   const files = event.files;
//   this.uploadForm.get('imageUpload')?.setValue(files)
//   console.log('Files uploaded:', files);
// }

// uploadImage(){

//   const formData = new FormData();
//   const files = this.uploadForm.get('imageUpload')?.value;
  
//   if (files && files.length > 0) {
//     for (let i = 0; i < files.length; i++) {
//       formData.append('image[]', files[i]);
//     }
//   }
//   const headers = new HttpHeaders();
//   headers.append('Content-Type', 'multipart/form-data');

//   const formDataString = JSON.stringify(formData);
//   console.log('FormData:', formDataString);
//   console.log('FormData:', formData);

   // Now you can send formDataString with headers to the server
  /*
  this.http.post('/inventory/addInventory', formDataString, { headers }).subscribe(response => {
    console.log('Upload successful:', response);
  }, error => {
    console.log('Upload error:', error);
  });
  */

  // Reset form after submission
  // this.uploadForm.reset();
// }




//  addInvestorForm() {

//   this.investorForms.push({});
// }


// removeInvestorForm() {
//   // Remove the last form from the array
//   if (this.investorForms.length > 0) {
//     this.investorForms.pop();
   
//   }
// }


//   calculateInvestment(i: number) {
//     this.amountInvested[i] = (this.percentageInvested[i] / 100) * this.vehicleInventory.costPrice;
//     this.vehicleInventory.investmentAmount[i] = this.amountInvested[i];
//     this.totalPercentageInvested = this.percentageInvested[i];
//     this.remainingPercentage = 100 - this.totalPercentageInvested;
//   }

}
