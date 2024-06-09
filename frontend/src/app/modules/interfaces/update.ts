import { IMultiValue } from "./inventory";

export interface IUpdateUser
{
    user_id: number
    user_name: string;
    email: string;
    role: string;
}

export interface IUpdateInvestor
{

    name: string;
    phoneNo: string;
    cnic: string;
    email: string;
    address: string;
    city: string;
    province: string;
    investor_type: string; 
}

export interface IUpdateCustomer
{
    customer_and_investor_id: number;
    name: string;
    catagory: string;
    type: string;
    phoneNo: string;
    email: string;
    province: string;
    city: string;
    address: string;
    cnic: string;

}

export interface IUpdateVehicleAttr{
 
    VehicleTypeAttribute: IUpdateAttr,
    MultiValueAttribute: any[]
}


export interface IUpdateAttr{
    attribute_id:(number| null);
    attribute_name: string;
    input_type: string;
    vehicleType: IUpdateVehicleType
}
export interface IUpdateVehicleType{
    type_id:number;
    type_name: string;
}


export interface IUpdateInventory {

    
    make : string;
    model : string ;
    variant : string;
    chasis_no : string ;
    engine_no : string ;
    price : string  ;
    demand : string  ;
    year : string ;
    color : string  ;
    status : string  ;
    reg_no : string  ;
    date_of_purchase: Date | string ;
 
}

export interface IUpdateEmployee
{
  employee_name: string,
  employee_cnic: string,
  employee_position: string,
  employee_status: string,
  employee_phone_no: string,
  employee_email: string,
  employee_salary: number,
  joining_date: Date,
  Termination_date: Date,
  shift_time: string,
  bonus: number,
  total_leaves:number,
  available_leaves:number,
  performance:string;
  showroomId: number;
}