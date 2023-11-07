import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/modules/auth/entities/User";
import { Inventory } from "src/modules/inventory/entities/Inventory";
import { MultiValueAttribute } from "src/modules/multi-value-attribute/entities/Multi-value-attribute";
import { StockAttributeValue } from "src/modules/stock-attribute-value/entities/Stock-attribute-value";
import { VehicleTypeAttribute } from "src/modules/vehicle-type-attribute/entities/Vehicle-type-attribute";
import { VehicleType } from "src/modules/vehicle-type/entities/Vehicle-type";
export const typeOrmConfig: TypeOrmModuleOptions  = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'd_m_s',
    entities: [Inventory, MultiValueAttribute, StockAttributeValue, VehicleType, VehicleTypeAttribute,User],
    synchronize: false, 
}