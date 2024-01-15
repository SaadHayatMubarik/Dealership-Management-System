import { Component,OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';

import { ApiHelperService } from 'src/app/shared/services/api-helper.service'; 


@Component({
  selector: 'app-view-showroom',
  templateUrl: './view-showroom.component.html',
  styleUrls: ['./view-showroom.component.scss']
})
export class ViewShowroomComponent extends BaseComponent implements OnInit {

  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
   showroomId = localStorage.getItem("Showroom Id");
  
  constructor(private readonly apiService: ApiHelperService)
  {
    super()
  }
 


  ngOnInit() {

    this.getShowrooms();

    this.columns = [
      {
        field: 'showroom_name',
        fieldTitle: 'Showroom Name',
      },
      {
        field: 'state',
        fieldTitle: 'Showroom State',
      },
      {
        field: 'city',
        fieldTitle: 'Showroom City',
      },
      {
        field: 'address',
        fieldTitle: 'Showroom Address',
      },
      {
        field: 'contact_no',
        fieldTitle: 'Contact Number',
      },
      
    ];
   
  }

  getShowrooms(){
    this.apiService.get(`/showroom/showroomDetails/${this.showroomId}`).subscribe((data) => {
      this.data = data;
  })
}


}

