import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/modules/auth/entity/User";
import { Inventory } from "src/modules/inventory/entity/Inventory";
import { MultiValueAttribute } from "src/modules/multi-value-attribute/entity/Multi-value-attribute";
import { Showroom } from "src/modules/showroom/entity/Showroom";
import { StockAttributeValue } from "src/modules/stock-attribute-value/entity/Stock-attribute-value";
import { VehicleTypeAttribute } from "src/modules/vehicle-type-attribute/entity/Vehicle-type-attribute";
import { VehicleType } from "src/modules/vehicle-type/entity/Vehicle-type";

export const typeOrmConfig: TypeOrmModuleOptions  = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'd_m_s',
    entities: [Inventory, MultiValueAttribute, StockAttributeValue , VehicleType, VehicleTypeAttribute ,User,Showroom],
<<<<<<< HEAD
    synchronize: false, 
}
=======
    synchronize: true, 
}
>>>>>>> f0c0a4afd2eaa05d096d9598f7038a634e9a5126
