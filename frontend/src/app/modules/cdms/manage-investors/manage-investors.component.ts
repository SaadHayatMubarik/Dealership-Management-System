import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { AuthService } from 'src/app/shared/services/auth.service';

import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { IInvestor } from '../../interfaces';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';

import { IUpdateInvestor } from '../../interfaces/update';




@Component({
  selector: 'app-manage-investors',
  templateUrl: './manage-investors.component.html',
  styleUrls: ['./manage-investors.component.scss']
})
export class ManageInvestorsComponent extends BaseComponent implements OnInit{


  UpdateInvestor: IUpdateInvestor =
  {
    name:'',
    phoneNo:'',
    cnic:'',
    email: '',
    address: '',
    city: '',
    province: '',
    investor_type: ''
  }

  investor: IInvestor = {
    investorName: '',
    cnic: '',
    phoneNo:'',
    email: '',
    address: '',
    city: '',
    province: '',
    investorType: '',
    showroomId: localStorage.getItem('Showroom Id'),
  };

 
  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];

  updateSidebarVisible:boolean = false;
  investorId:number=0;
  investments : any[] = [];

  constructor(private apiService : ApiHelperService, 
    private toast : ToastService,
    private router: Router,
    private authService : AuthService )
  {
    super();
  }

  displayDialog: boolean = false;

  showDialog() {
    this.displayDialog = true;
  }

  ngOnInit() {
    this.getinvestors();
    this.getCustomer();

    this.columns = [
      {
        field: 'name',
        fieldTitle: 'Name',
      },
      {
        field: 'phoneNo',
        fieldTitle: 'Phone Number',
      },
      {
        field: 'cnic',
        fieldTitle: 'Cnic',
      },
      {
        field: 'investor_type',
        fieldTitle: 'Investor Type',
      },
   
    ];
    this.actions = [
      {
        label: ' Delete',
        icon: 'pi pi-trash',
        command: (event) => {
          this.investorId = event.customer_and_investor_id
          this.apiService.delete(`/investor/deleteInvestor/${this.investorId}`).subscribe({
            next: (response) => { 
              this.getinvestors();
              this.toast.showSuccess("Investor Deleted.");
            },
            error: () => 
            {
              this.toast.showError('Investor has investements can not be deleted.');
            }
          }
            );           
            },
            permission: 'delete.manageInvestors'
          },
      {
        label: 'Update',
        icon: 'pi pi-pencil',
        command: (event) => {
        this.investorId = event.customer_and_investor_id;
        this.updateSidebarVisible = true;
        this.getInvestorById(this.investorId);
        
        },
        permission: 'update.manageInvestors'
      },
      {
        label: 'View',
        icon: 'pi pi-eye',
        command: (event) => {
          this.investorId = event.customer_and_investor_id;
          this.router.navigate(['manage-investments', this.investorId]);
          // this.showDialog();
          this.getInvestments(this.investorId);
          // console.log(this.investorId);

        },
         permission: 'view.manageInvestors'
      }
    ];
    this.actions = this.actions.filter(action => !action.permission || this.authService.hasPermission(action.permission));
  }

  @ViewChild('investorForm') investorForm!: NgForm;
  @ViewChild('updateForm') updateForm!: NgForm;



  validateNumericInput(event: KeyboardEvent) {
    // Get the character being typed
    const char = event.key;

    // Allow only numbers (0-9) and navigation keys (e.g., backspace, delete)
    if (!(char >= '0' && char <= '9') && !['Backspace', 'Delete',].includes(event.code)) {
        event.preventDefault();
    }
}
validateAlphabeticInput(event: KeyboardEvent) {
  // Get the character being typed
  const char = event.key;

  // Allow alphabetic characters (letters), spaces, and navigation keys (e.g., backspace, delete)
  if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === ' ') && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.code)) {
      event.preventDefault();
  }
}

selectedCustomer:any='';
investor_type_selected:string='';

onCustomerChange(event: any) {
  this.selectedCustomer = event.value;
  this.investor.investorName = this.selectedCustomer.name;
  this.investor.email = this.selectedCustomer.email;
  this.investor.address = this.selectedCustomer.address;
  this.investor.cnic = this.selectedCustomer.cnic;
  this.investor.province = this.selectedCustomer.province;
  this.investor.city = this.selectedCustomer.province;
  this.investor.phoneNo = this.selectedCustomer.phoneNo;
  this.investor.investorType = this.investor_type_selected;
}

onSubmit(){

  if(this.investorForm.valid){
    this.investor.investorType = this.investor_type_selected;
    this.apiService
    .post('/investor/addInvestor', this.investor)
    .subscribe({
      next: (response) => {
        console.log('investor',this.investor);
        console.log('response',response);
        this.closeModal();
        this.toast.showSuccess('New Investor Added.');
        this.getinvestors();
        this.investorForm.reset();
      },
      error: () => {
        this.toast.showError();
        console.log('error',this.investor);
      },
    });
  }

  else{
    this.toast.showError("Please fill all fields correctly")
  }
}

getinvestors(){
  this.apiService.get(`/investor/getInvestor/0/${this.investor.showroomId}`).subscribe((data) => {
    this.data = data;
  });
}


getInvestorById(investorId: number){
  this.apiService.get(`/investor/getInvestorDetails/${investorId}`).subscribe((data: IUpdateInvestor) => {
    this.UpdateInvestor = data;
  });

}

getInvestments(investorId: number){
 
  this.apiService.get(`/investment/getInvestment/${investorId}`).subscribe((data) => {
    this.investments = data;
    console.log('api call', this.investments);
  });
}




investor_form : string[] = ['New','Existing'];
investor_form_input : string= '';
customers: any[] = [];
customer_id: number = 0;
investor_type : string[] = ['Owner', 'ThirdParty'];

getCustomer(){
  this.apiService.get(`/customer/getCustomerByShowroom/${this.investor.showroomId}`).subscribe((data) => {
    this.customers = data;
  });
}


update(){
  if (this.updateForm.valid)
    {
      this.apiService.put('/investor/updateInvestor', this.UpdateInvestor).subscribe({
        next: (response) => {
          this.toast.showSuccess('Investor information updated.');
          this.updateSidebarVisible = false;
          this.getinvestors();
          console.log('Success Object:', this.UpdateInvestor);
        },
        error: () => {
          this.toast.showError('Server Error! Please try again later.');
          console.log('Error Object:', this.UpdateInvestor);              
        },
      });
    }
   else (
   this.toast.showError("Please fill the form correctly.")
    )
}

}
