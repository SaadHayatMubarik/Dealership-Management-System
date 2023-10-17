export interface IObject {
  [key: string]: any;
}

export interface ApiResponse {

  data: IObject | IObject[];
  message: string;
  statusCode: number;
}

export interface IOption {
  label?: string | null;
  value?: number | string | null;
}
export interface CustomCommand {
  buttonTitle: string;
  id: number;
}
export interface ICheckboxTableColumn {
  field: string;
  fieldTitle: string;
  width?: number;
  cssClass?: string;
  locked?: boolean;
  isCheckbox?: boolean;
  isReadOnlyLabel?: boolean;
  type?: string;
  sortable: boolean;
  filterable: boolean;
  mergeColumns?: string[];
  hidden?: boolean;
  icon?: string;
}

export interface ICheckboxTableResult {
  checked: boolean;
  data: IObject;
  columnID: any;
}

export interface CheckboxTableResult {
  checked: boolean;
  data: IObject;
  columnID: any;
}

export interface CheckboxTableColumn {
  field: string;
  fieldTitle: string;
  width?: number;
  cssClass?: string;
  locked?: boolean;
  isCheckbox?: boolean;
  isReadOnlyLabel?: boolean;
  type?: string;
  sortable: boolean;
  filterable: boolean;
  mergeColumns?: string[];
  hidden?: boolean;
  icon?: string;
}

export class DataTableColumn {
  field = '';
  sort?: IDataTableSortChangeEvent;
  fieldTitle?: string;
  width?: number;
  columnWidth?: string;
  height?: number;
  cssClass?: string;
  icon?: string;
  iconValue?: string;
  iconField?: any;
  type?: string;
  values?: any[];
  editable?: boolean;
  isVisible?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  action?: Function;
  replace?: {
    searchColumn: string;
    searchValue: string;
    replaceColumn: string;
  };

  isSortable?: boolean;
  isAddPopupFilter?: boolean;
  filter?: {
    type?: string;
    model?: any;
    values?: any[];
    label?: string;
    command?: (param?: any) => any;
  };

  mergeColumns?: string[] | any;
  mergeColumnsByType?: {
    type: string;
    column: string;
    class?: any;
    isOptional?: boolean;
  }[];

  editTemplate?: {
    type: string;
    data: any[];
    valueField: string;
    textField: string;
    bindingFieldName: string;
    bindingFieldId: string;
  };
}


export interface IDataTableAction {
  // assets: any;
  label: string;
  icon?: string;
  toolTip?: string;
  command?: (param?: any) => any;
  isConditional?: boolean;
  isDescriptionField?: boolean;
  field?: string;
  hasElement?: string;
  dataLength?: number;
  values?: any[];
  buttonClass?: string;

}

export interface IDataTableSortChangeEvent {
  field?: string;
  order: sortOrder;
}

export type sortOrder = number | 'DESC' | 'ASC';

export interface IDataTableFilterChangeEvent {
  field: string;
  value: string | Date;
}

export interface IDataTablePageChangeEvent {
  pageNumber: number;
  pageSize: number;
}

export interface IPopupFilterResultINT {
  value: string;
  field: string;
}

export interface IDataTableActionProperties {
  width?: number;
  title?: string;
  isMenu?: boolean;
  columnWidth?: any;
}

export interface IActionResult {
  Setting?: any;
  isSuccess?: boolean;
  data?: any;
  error?: string | any;
  totalCount?: number;
}

export interface ILoader {
  loaderFlag?: boolean;
  loaderMessage?: string;
}

export interface ImageUpload {
  imgUrl: any;
  base64Image: string;
  height: number;
  width: number;
}

export interface DataTablePageChangeEvent {
  skip: number;
  top: number;
}

export interface DataTableFilterChangeEvent {
  field: string;
  value: string | Date;
}

export interface IDataTableResults {
  data: any[];
  total: number | undefined;
}

export interface IDataTableRowDrop {
  id: number;
  sequence_number: number;
}

export interface ILoaderState {
  show: boolean;
}

export type IDataTable = any; //GridComponent;

export interface ISelectData {
  id: string | number;
  name: string;
}

export interface ITreeNode {
  data?: IObject;
  children?: ITreeNode[];
  parent?: ITreeNode;
  leaf?: boolean;
  type?: string;
  expanded?: boolean;
}

export interface ITreeNodeExpandEvent {
  node: ITreeNode;
  originalEvent?: Event;
}

export interface ITreeReload {
  filter?: string;
  node?: ITreeNode;
  page: number;
}

export interface IToaster {
  severity?: string;
  summary?: string;
  message: string;
  time?: number;
}

export interface IFilterDescriptor {
  field?: string | VoidFunction;
  operator: string | VoidFunction;
  value?: any;
  ignoreCase?: boolean;
}

export interface ICompositeFilterDescriptor {
  logic: 'or' | 'and';
  filters: Array<IFilterDescriptor>;
}

export interface IFilter {
  column: string;
  value: string;
}

export interface ICheckBoxSelection {
  selectAll?: boolean;
  key: string;
}

