export interface IUpdateUser
{
    user_id: number
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
    customer_id: number;
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
 
    // multiValue: IUpdateMultivalue[];
    // vehicleAttributeId: number | null;
    // vehicleAttributeName: string;
    // attributeInputType: string;
    // vehicleTypeDto: any;
    VehicleTypeAttribute: IUpdateAttr,
    MultiValueAttribute: any[]
}
// export interface IUpdateMulti {
//     multi_value_id: number | null;
//     attribute_value: string;
// }

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