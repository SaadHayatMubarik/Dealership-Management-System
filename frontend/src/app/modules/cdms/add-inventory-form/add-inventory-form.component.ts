import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import {
  IInventory,
  IStockAttributeValue,
  IVehicleTypeAttribute,
  IVehicleTypeAttributeDto,
} from '../../interfaces/inventory';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';

import { NgForm } from '@angular/forms';

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
  };


  vehicleTypes: any[] = []; //to populate dropdown of vehicle type
  status: string[] = ['AVAILABLE', 'SOLD', 'ON ORDER']; //to populate status dropdown
  sliderValue: number = 0;
  selectedVehicleTypeId: any; //saving vehicle type id
  vehicleAttributes: any[] = []; //to save vehicle type attributes
  inventoryId : number = 0;
  selectedTabIndex: number = 0;

  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  constructor(
    private readonly apiService: ApiHelperService,
    private toast: ToastService
  ) {
    super();
  }

  ngOnInit() {
    this.onTabChange({ index: this.selectedTabIndex });
    this.getVehicleTypes();
    // this.getInventory();
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
      {
        field: 'mileage',
        fieldTitle: 'Mileage',
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
              this.getInventory();
              this.toast.showSuccess(`Inventory Id: ${this.inventoryId} record deleted.`);   
            },
            error: () => 
            {
              this.toast.showError('System Error');
            }
          }
            );
        },
      },
      {
        label: 'Update',
        icon: 'pi pi-file-edit',
        command: (event) => {
          
        },
      },
      {
        label: 'View',
        icon: 'pi pi-eye',
        command: (event) => {
          
        },
      }
    ];
  }

  @ViewChild('Inventory') InventoryForm!: NgForm;

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
      this.selectedVehicleTypeId = event.value;
      if (this.selectedVehicleTypeId.type_id) {
        this.apiService
          .get(`/vehicle-type-attribute/${this.selectedVehicleTypeId.type_id}`)
          .subscribe((attributes: IVehicleTypeAttributeDto[]) => {
            this.vehicleAttributes = attributes;
            console.log(this.vehicleAttributes);
            this.vehicleInventory.stockAttributeValue = [];
            let stockAttrVals: IStockAttributeValue[] = [];
            console.log('====================================');
            attributes.forEach((vta: IVehicleTypeAttributeDto) => {
              console.log(vta);
              stockAttrVals.push({ id: 0, value: '', inventoryInventoryId:0, multiValueAttributeMultiValueId:0, vehicleTypeAttribute: vta })
              console.log(vta.multiVals);
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
    return attribute.multiValueAttributes.map(
      (mv: IObject) => mv['attribute_value']
    ) as string[];
  }

  // getOptions(attribute: any) {
  //   if (attribute && attribute.multiValueAttributes) {
  //     return attribute.multiValueAttributes.map(
  //       (mv: IObject) => mv['attribute_value']
  //     ) as string[];
  //   } 
  //   else {
  //     console.log('asihsa');
  //     return ['a'];
     
  //   }
  // }
  

  postInventory() {
   
      console.log('this.vehicleInventory', this.vehicleInventory);
      
      this.apiService
        .postLogin('/inventory/addInventory', this.vehicleInventory)
        .subscribe({
          next: (response) => {
            this.toast.showSuccess('New Inventory Added');
            this.closeModal();
          },
          error: () => {
            this.toast.showError();
            console.log(this.vehicleInventory);
          },
        });
   
  }

  onTabChange(event: any) {
    this.selectedTabIndex = event.index;
    this.getInventory();
  }

  getInventory(){
    this.apiService.get(`/inventory/getInventory/${this.vehicleInventory.showroomId}/${this.status[this.selectedTabIndex]}`).subscribe((data) => {
      this.data = data;
      console.log(this.data);
      console.log(this.status[this.selectedTabIndex]);
    });
  }

}
