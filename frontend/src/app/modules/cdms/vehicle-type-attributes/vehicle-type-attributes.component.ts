import { Component, ErrorHandler, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { IVehicleTypeAttribute } from '../../interfaces/inventory';
import { DialogControlService } from 'src/app/shared/services/dialog.service';
import { ToastService } from 'src/app/shared/services/toast.service';




import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';

@Component({
  selector: 'app-vehicle-type-attributes',
  templateUrl: './vehicle-type-attributes.component.html',
  styleUrls: ['./vehicle-type-attributes.component.css'],

})
export class VehicleTypeAttributesComponent  extends BaseComponent implements OnInit {


 
  vehicleTypeAttribute: IVehicleTypeAttribute = {
    vehicleAttributeName:'',
    attributeInputType:'',
    vehicleAttributeValue:[],
    vehicleType:'',
    ShowroomId : localStorage.getItem("Showroom Id"),
  };


  vehicleTypes: any[] = [];
  selectedVehicleTypeAttributeId: any; 
  inputTypes: any[] = ['TEXT', 'NUMBER', 'DATE', 'DROPDOWN'];
  
  modalVisible = false;
  updateSidebarVisible = false; 
 
  
  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  
  showroomID :any; 
  vehicle_attribute_id: string = '';
  
  constructor(private readonly apiService: ApiHelperService, 
              private dialogService: DialogControlService ,
              private toastService:ToastService) {
    super()
      
  }

  ngOnInit() 

  {
    this.getVehicleTypes(); 
    this.getVehicleTypeAttribute();
   
   this.columns = [
    {
      field: 'vehicleTypeName',
      fieldTitle: 'Vehicle Type Name',
    },
    {
        field: 'vehicleAttributeName',
        fieldTitle: 'Attribute Name',
      },
      {
        field: 'vehicleAttributeValue',
        fieldTitle: 'Attribute Value',
      },
      {
        field: 'attributeInputType',
        fieldTitle: 'Input Type',
      },
      
    
    ];

    this.actions = [
      {
        label: ' Delete',
        icon: 'pi pi-trash',
        command: (event) => {
          this.selectedVehicleTypeAttributeId = event.vehicleAttributeId;
          
              this.apiService.delete(`/vehicle-type-attribute/${this.selectedVehicleTypeAttributeId}`).subscribe({
                next: (response) => {
                  this.getVehicleTypes();
                  this.getVehicleTypeAttribute();
                  this.toastService.showSuccess( `${event.vehicleAttributeName} attribute deleted.`);
                  console.log(this.selectedVehicleTypeAttributeId);
                  
                },
                error: () => 
                {
                  this.toastService.showError();
                  console.log(this.selectedVehicleTypeAttributeId);
                }
              }
                );
              }
             
            },
      {
        label: 'Update',
        icon: 'pi pi-file-edit',
        command: (event) => {
          
          this.vehicle_attribute_id = event.vehicleAttributeId;
          
          this.updateSidebarVisible = true;
          this.getVehicleAtt();

        },
      },
    ];
  }






  getVehicleTypes() {
    this.apiService.get(`/vehicle-type/${this.vehicleTypeAttribute.ShowroomId}`).subscribe({
      next: (response: IObject[]) => {
        this.vehicleTypes = response;
        console.log(this.vehicleTypes);
        
      },
      error: () => {
        this.toastService.showError();
      },
    });
  }
  
  getVehicleTypeAttribute(){
    this.apiService.get(`/vehicle-type-attribute/getVehicleAttribute/${this.vehicleTypeAttribute.ShowroomId}`).subscribe((data) => {
      this.data = data;
      console.log(this.data);
    });
  }
 
  resetForm() {
    this.vehicleTypeAttribute.vehicleAttributeName = "";
    this.vehicleTypeAttribute.attributeInputType = '';
    this.vehicleTypeAttribute.vehicleAttributeValue = [];
    this.vehicleTypeAttribute.vehicleType = '';
  }

  saveVehicleTypeAttribute() {
    if (this.vehicleTypeAttribute.vehicleAttributeName !== '') {
      if(this.vehicleTypeAttribute.attributeInputType != 'DROPDOWN'){
        this.vehicleTypeAttribute.vehicleAttributeValue[0] = '';
      }
      this.apiService
        .post('/vehicle-type-attribute/addVehicleTypeAttribute', this.vehicleTypeAttribute)
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.closeModal();
           this.toastService.showSuccess('New vehicle type attribute created.')
           this.getVehicleTypeAttribute();
           console.log(this.vehicleTypeAttribute);
          },
          error: () => {
           this.toastService.showError();
          },
        });
    }
  }

  isDropdownSelected(): boolean {
    return this.vehicleTypeAttribute.attributeInputType === 'DROPDOWN';
  }


  vehicleAttr:any;
  //get individual vehicle type attribute, check this api
  getVehicleAtt(){
    this.apiService.get(`/vehicle-type-attribute/getVehicleAttributeById/${this.vehicle_attribute_id}`).subscribe((data) => {
      this.vehicleAttr = data;
      console.log(this.vehicleAttr);
    });


  }

}




 



