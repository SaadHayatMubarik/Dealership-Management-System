import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './components/datatable/datatable.component';
import { ButtonComponent } from './components/button/button.component';
import { AccordionModule as PrimeAccordionModule } from 'primeng/accordion';
import { AutoCompleteModule as PrimeAutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule as PrimeAvatarModule } from 'primeng/avatar';
import { AvatarGroupModule as PrimeAvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule as PrimeButtonModule } from 'primeng/button';
import { CalendarModule as PrimeCalendarModule } from 'primeng/calendar';
import { CardModule as PrimeCardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule as PrimeDialogModule } from 'primeng/dialog';
import { DropdownModule as PrimeDropdownModule } from 'primeng/dropdown';
import { EditorModule as PrimeEditorModule } from 'primeng/editor';
import { InputSwitchModule as PrimeInputSwitchModule } from 'primeng/inputswitch';
import { MenubarModule as PrimeMenubarModule } from 'primeng/menubar';
import { MultiSelectModule as PrimeMultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule as PrimePaginatorModule } from 'primeng/paginator';
import { PanelMenuModule as PrimePanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule as PrimeSidebarModule } from 'primeng/sidebar';
import { SplitterModule as PrimeSplitterModule } from 'primeng/splitter';
import { TableModule as PrimeTableModule } from 'primeng/table';
import { TabViewModule as PrimeTabViewModule } from 'primeng/tabview';
import { ToastModule as PrimeToastModule } from 'primeng/toast';
import { TooltipModule as PrimeTooltipModule } from 'primeng/tooltip';
import { TreeTableModule as PrimeTreeTableModule } from 'primeng/treetable';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { CalendarModule } from 'primeng/calendar';
import { AppLayoutModule } from './layout/app.layout.module';
import { AutocompleteComponent, CheckboxComponent, DropdownComponent, MultiselectComponent, NumericTextboxComponent, RadiobuttonComponent, SelectComponent, SwitchComponent, TextareaComponent, TextboxComponent } from './components/inputs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from './components/avatar/avatar.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DialogComponent } from './components/dialog';
import { LoaderComponent } from './components/loader/loader.component';
// import { ToastControlComponent } from './components/toast';
import { ToastService } from './services/toast.service';
import { InputTextModule } from 'primeng/inputtext';
import { AppConfigModule } from './layout/config/config.module';
import { TreetableComponent } from './components/treetable/treetable.component';
import { MessageService } from 'primeng/api';
import { PermissionDirective } from './custom-directive/permission.directive';

const modules = [
    PrimeAccordionModule,
    PrimeAutoCompleteModule,
    PrimeAvatarModule,
    PrimeAvatarGroupModule,
    PrimeButtonModule,
    PrimeCalendarModule,
    PrimeCardModule,
    CheckboxModule,
    PrimeDialogModule,
    PrimeDropdownModule,
    PrimeEditorModule,
    PrimeInputSwitchModule,
    PrimeMenubarModule,
    PrimeMultiSelectModule,
    PrimePaginatorModule,
    PrimePanelMenuModule,
    PrimeSidebarModule,
    PrimeSplitterModule,
    PrimeTableModule,
    PrimeTabViewModule,
    PrimeToastModule,
    PrimeTooltipModule,
    PrimeTreeTableModule,
    SliderModule,
    SplitButtonModule,
    ProgressBarModule,
    CalendarModule,
    InputTextModule,
    AppConfigModule,
    AppLayoutModule
]

const components = [
    AvatarComponent,
    ButtonComponent,
    DatatableComponent,
    DialogComponent,
    LoaderComponent,
    // ToastControlComponent,
    TreetableComponent,
    AutocompleteComponent,
    CheckboxComponent,
    DropdownComponent,
    MultiselectComponent,
    NumericTextboxComponent,
    RadiobuttonComponent,
    SelectComponent,
    SwitchComponent,
    TextareaComponent,
    TextboxComponent,
    DatepickerComponent,
    // PermissionAccordionComponent
];


@NgModule({
    declarations: [
     ...components,
    //  PermissionDirective
        
    ],
    imports: [   
        CommonModule,     
        FormsModule,
        ReactiveFormsModule,
       
       ...modules,

    ],
    providers: [
        ToastService,
        MessageService,
    ],
    bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

    exports : [
       ...components
    ]
})
export class AppSharedModule { }
