export interface IUpdateUser
{
    user_name: string;
    email: string;
    role: string;
}

export interface IUpdateInvestor
{
    investor_name: string;
    phone: string;
    cnic: string;
}

export interface IUpdateCustomer
{
    catagory: string;
    name: string;
    phoneNo: string;
    email: string;
    province: string;
    city: string;
    address: string;
    type: string;
    cnic: string;

}

export interface IUpdateVehicleAttr{
 
    multiValueId?: (number| null)[];
    vehicleAttributeId?: number | null;
    vehicleTypeName?: string;
    vehicleAttributeName: string;
    attributeInputType: string;
    vehicleAttributeValue:string[];

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