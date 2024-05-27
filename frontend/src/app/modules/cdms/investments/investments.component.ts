import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { IInvestor } from '../../interfaces';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent {

  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];

  investorId: string= '';
  inventory_id : number = 0
  
  constructor(private apiService : ApiHelperService, 
    private toast : ToastService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.investorId = this.route.snapshot.paramMap.get('investorId')!;
    console.log('ID:',this.investorId);
    this.getInvestments(this.investorId);

    this.columns = [
      {
        field: 'investment_amount',
        fieldTitle: 'Amount',
      },
      {
        field: 'investment_date',
        fieldTitle: 'Date',
      },
        
      {
        field: 'inventory.make',
        fieldTitle: 'Make',
      },
      {
         field: 'inventory.model',
        fieldTitle: 'Model',
      },
      {
        field: 'inventory.variant',
        fieldTitle: 'Variant',
      },
      {
        field: 'profit',
        fieldTitle: 'Profit',
      },
    
   
    ];

    this.actions = [
      {
        label: 'View',
        icon: 'pi pi-eye',
        command: (event) => {
         this.inventory_id = event.inventory.inventory_id
         console.log('inventory_id', this.inventory_id);
          this.router.navigate([`detail-view/${this.inventory_id}`]);
        },
      }
    ];
    
  }


  getInvestments(investorId: string) {
    this.apiService.get(`/investment/getInvestment/${investorId}`).subscribe((data: any[]) => {
      this.data = data.map(item => ({
        ...item,
        investment_date: this.formatDate(item.investment_date)
      }));
    });
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // This returns the date part in 'YYYY-MM-DD' format
  }
}
