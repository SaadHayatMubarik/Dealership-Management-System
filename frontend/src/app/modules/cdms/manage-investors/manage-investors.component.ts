import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { IInvestor } from '../../interfaces';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';

import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-manage-investors',
  templateUrl: './manage-investors.component.html',
  styleUrls: ['./manage-investors.component.scss']
})
export class ManageInvestorsComponent extends BaseComponent implements OnInit{

  investor: IInvestor = {
    investorName: '',
    cnic: '',
    phoneNo:'',
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
    this.getinvestors();

  }


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

onSubmit(){
  {
    this.apiService
      .post('/investor/addInvestor', this.investor)
      .subscribe({
        next: (response) => {
          console.log(this.investor);
          console.log(response);
          this.closeModal();
          this.toast.showSuccess('New User.');
          this.getinvestors();
        },
        error: () => {
          this.toast.showError();
          console.log(this.investor);
        },
      });
  }
}

getinvestors(){
  this.apiService.get(`/investor/getInvestor/${this.investor.showroomId}`).subscribe((data) => {
    console.log(data);
    this.data = data;
  });
}

}
