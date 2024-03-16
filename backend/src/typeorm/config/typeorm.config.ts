import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Account } from "src/modules/account/entity/Account";
import { User } from "src/modules/auth/entity/User";
import { Customer } from "src/modules/customer/entity/Customer";
import { Employee } from "src/modules/employee/entity/Employee";
import { Inventory } from "src/modules/inventory/entity/Inventory";
import { Investment } from "src/modules/investment/entity/Investment";
import { Investor } from "src/modules/investor/entity/Investor";
import { MultiValueAttribute } from "src/modules/multi-value-attribute/entity/Multi-value-attribute";
import { Notification } from "src/modules/notification/entity/Notification";
import { Picture } from "src/modules/picture/entity/Picture";
import { Showroom } from "src/modules/showroom/entity/Showroom";
import { StockAttributeValue } from "src/modules/stock-attribute-value/entity/Stock-attribute-value";
import { Transaction } from "src/modules/transcation/entity/Transcation";
import { VehicleTypeAttribute } from "src/modules/vehicle-type-attribute/entity/Vehicle-type-attribute";
import { VehicleType } from "src/modules/vehicle-type/entity/Vehicle-type";

export const typeOrmConfig: TypeOrmModuleOptions  = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'd_m_s',
    entities: [Inventory, MultiValueAttribute, StockAttributeValue , VehicleType, VehicleTypeAttribute ,User,Showroom,Customer,Notification,Investment,Investor,Picture,Transaction,Account, Employee],
    synchronize: false, 
}

