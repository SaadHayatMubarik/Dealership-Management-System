import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Inventory } from "src/modules/inventory/Inventory";
import { MultiValueAttribute } from "src/modules/multi-value-attribute/Multi-value-attribute";
import { StockAttributeValue } from "src/modules/stock-attribute-value/Stock-attribute-value";
import { VehicleTypeAttribute } from "src/modules/vehicle-type-attribute/Vehicle-type-attribute";
import { VehicleType } from "src/modules/vehicle-type/Vehicle-type";
export const typeOrmConfig: TypeOrmModuleOptions  = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'd_m_s',
    entities: [Inventory, MultiValueAttribute, StockAttributeValue, VehicleType, VehicleTypeAttribute],
    synchronize: false,
}