import { Directive, ViewChild } from "@angular/core";
import { IDataTableFilterChangeEvent, IDataTablePageChangeEvent, IDataTableSortChangeEvent } from "./interfaces/common";

export type sortOrder = number | 'DESC' | 'ASC';

@Directive()
export class BaseComponent {
  modal: boolean = false;
  constructor() { }

  @ViewChild('search', { static: false })
  _defaultSearch: any;

  filters: any[] = [];
  _defaultPageSize = 10;



  dataTableSelectedFilters: IDataTableFilterChangeEvent[] = [];


  currentPage: IDataTablePageChangeEvent = {
    pageNumber: 1,
    pageSize: this._defaultPageSize,
  };

  get pageSize(): number {
    return this._defaultPageSize;
  }

  set pageSize(value: number) {
    this._defaultPageSize = value;
    this.currentPage.pageSize = value;
  }

  private _filterInclude: string[] = [];
  get include(): string[] {
    return this._filterInclude || [];
  }
  set include(include: string[]) {
    this._filterInclude = include || [];
  }

  mergeFilterParams(params: IDataTableFilterChangeEvent[]): string {
    let param = '';
    if (params && params.length > 0) {
      params.forEach((x) => {
        if (x.value) {
          param += `${(x.field ? `${x.field}=` : '') + x.value}&`;
        }
      });
      param = param.substr(0, param.length - 1);
    }

    return param;
  }
  getGlobalSearch(
    key: string,
    type: string = 'contains',
    searchValue = this._defaultSearch?.controlModel || ''
  ) {
    if (searchValue) {
      return key.includes(',') ? `(${key.split(',').filter(x => x).map((x: string) => {

        return `${x} ${type} ${searchValue}`
      }).join(' or ')})` : `${key} ${type} ${searchValue}`;
    }
    return ''
  }

  getPageParams(
    filter = '',
    currentPage: IDataTablePageChangeEvent = this.currentPage,
    filterInclude: string[] = this.include,
    dataTableFilter: string = this.mergeFilterParams(
      this.dataTableSelectedFilters
    ),
    globalFilterKey: string = '',
    filterAction: string = '',
  ): string {
    let pageParam =
      filter && filter.length !== 0
        ? `${globalFilterKey || 'filter'}=${filter}`
        : '';
    const selectedFilters = this.filters.filter((x) => x.value);
    if (selectedFilters) {
      const filterParams = selectedFilters.map((x) => {
        return `${x['field']} ${x['filterType'] || 'eq'} ${x['value']}`;
      });
      pageParam = pageParam !== '' ? `${pageParam},` : '';
      pageParam += filterParams.join(',');
    }

    if (dataTableFilter) {
      pageParam = pageParam !== '' ? `${pageParam},` : '';
      pageParam += dataTableFilter;
    }

    if (currentPage) {
      
      pageParam = pageParam !== '' ? `${pageParam}&` : '';
      pageParam += `skip=${(currentPage.pageNumber - 1) * currentPage.pageSize
        }&top=${this.pageSize}`;
    }

    if (filterAction) {
      pageParam = pageParam !== '' ? `${pageParam}&` : '';
      pageParam += `action=${filterAction}`;
    }
    if (filterInclude.length) {
      pageParam = pageParam !== '' ? `${pageParam}&` : '';
      pageParam += `include=${filterInclude}`;
    }

   

    return pageParam !== '' ? `?${pageParam}` : '';
  }

  openModal() {
    this.modal = true;
  }
  closeModal() {
    this.modal = false;
  }
}