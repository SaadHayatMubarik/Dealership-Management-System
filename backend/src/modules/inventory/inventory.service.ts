import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Inventory } from './entities/Inventory';
import { Repository } from 'typeorm';
import { InventoryDto } from './dto/inventory.dto';
import { InventoryStatus } from './inventory-status.enum';
import { Inventory } from './entity/Inventory';
import { Showroom } from '../showroom/entity/Showroom';
import { StockAttributeValue } from '../stock-attribute-value/entity/Stock-attribute-value';
// import { MulterModule } from '@nestjs/platform-express';
// import { MultiValueAttribute } from '../multi-value-attribute/entity/Multi-value-attribute';
import { GetInventroyDto } from './dto/getInventory.dto';
import { VehicleType } from '../vehicle-type/entity/Vehicle-type';
// import { GetInventoryByFilterDto } from './dto/getInventoryByFilter.dto';
// import { identity } from 'rxjs';
import { VehicleTypeAttribute } from '../vehicle-type-attribute/entity/Vehicle-type-attribute';
// import { privateDecrypt } from 'crypto';
import { UpdateInventoryDto } from './dto/updateInventory.dto';
import { Customer } from '../customer/entity/Customer';
import { CustomerType } from '../customer/customer-type.enum';
import { Investment } from '../investment/entity/Investment';
import { Investor } from '../investor/entity/Investor';
import { privateDecrypt } from 'crypto';
import { PictureService } from '../picture/picture.service';



@Injectable()
export class InventoryService {

    constructor (
        @InjectRepository(Inventory)
        private inventoryRepository: Repository<Inventory>,
        @InjectRepository(Showroom)
        private showroomRepository: Repository<Showroom>,
        @InjectRepository(VehicleType)
        private vehicleTypeRepository: Repository<VehicleType>,
        @InjectRepository(StockAttributeValue)
        private stockValueAttributeRepository: Repository <StockAttributeValue>,
        @InjectRepository(VehicleTypeAttribute)
        private vehicleTypeAttribute: Repository <VehicleTypeAttribute>,
        @InjectRepository(Customer)
        private customerRepository: Repository <Customer>,
        @InjectRepository(Investment)
        private  investmentRepository: Repository <Investment>,
        @InjectRepository(Investor)
        private investorRepository: Repository <Investor>
    ){}

    async addInventory (addInventoryDto: InventoryDto): Promise<Inventory>{
        const { vehicleType, vehicleMake, vehicleModel , vehicleVariant , modelYear ,
             vehicleChasisNo , costPrice , demand , dateOfPurchase , dateOfSale ,
              bodyColor , engineNo , comments , grade , regNo, mileage, status,
               showroomId ,stockAttributeValue, sellerId, investmentAmount, investor } = addInventoryDto;
        if (investor.length >0){
        const inventory = new Inventory();
        inventory.make = vehicleMake.toUpperCase();
        inventory.model = vehicleModel.toUpperCase();
        inventory.variant = vehicleVariant.toUpperCase();
        inventory.year = modelYear;
        inventory.chasis_no = vehicleChasisNo.toUpperCase();
        inventory.price = costPrice;
        inventory.demand = demand;
        inventory.date_of_purchase = dateOfPurchase;
        inventory.date_of_sale = dateOfSale;
        inventory.color = bodyColor.toUpperCase();
        inventory.engine_no = engineNo.toUpperCase();
        inventory.comments = comments.toUpperCase();
        inventory.grade = grade;
        inventory.status = status;
        inventory.reg_no = regNo.toUpperCase();
        inventory.mileage = mileage;
        inventory.vehicleType = vehicleType;
        inventory.showroom = await this.showroomRepository.findOne({ where: { showroom_id: showroomId } });
        inventory.seller = await this.customerRepository.findOneBy({customer_id: sellerId});
        await this.inventoryRepository.save(inventory);

        const inventoryId = await this.inventoryRepository.getId(inventory);

        let inventoryObj = await this.inventoryRepository.findOne({where:{inventory_id:inventoryId}})
        // customer.inventories = [inventoryObj];
        // await this.customerRepository.preload(customer);
        const typeId = await this.vehicleTypeRepository.getId(vehicleType);
        for (let i=0; i<stockAttributeValue.length; i++){ 
            const stockAttributeattrValue = new StockAttributeValue();
            stockAttributeattrValue.value = stockAttributeValue[i].value;

            stockAttributeattrValue.vehicleTypeAttribute = await this.vehicleTypeAttribute.findOne({where:{vehicleType:{type_id:typeId}}});
            stockAttributeattrValue.inventory = inventoryObj;

            await this.stockValueAttributeRepository.save(stockAttributeattrValue);
        }
        for (let i=0; i<investor.length; i++){
            let investorId = await this.investorRepository.getId(investor[i]);
            let getData = await this.investorRepository.createQueryBuilder('investor')
            .select('capital_amount')
            .where('investor.investor_id = :investorId',{investorId})
            .getRawOne();
            if (getData) {
                const capitalAmount = getData.capital_amount;
                let getCapitalAmount = capitalAmount + investmentAmount[i];
            await this.investorRepository.update({investor_id:investorId},{capital_amount: getCapitalAmount});
            }

            const investment = new Investment();
            investment.investment_date = new Date();
            investment.investment_amount = investmentAmount[i];
            investment.inventory = inventoryObj;
            investment.investor = investor[i];
            await this.investmentRepository.save(investment);

        }
        return inventory;
    }
    }

    async getInventory(status: String, showroomId: number): Promise<GetInventroyDto[]>{
        const getData = this.inventoryRepository.createQueryBuilder('inventory')
        .select(['inventory_id as inventoryId','make as vehicleMake','model as vehicleModel', 'variant as vehicleVariant', 'year as modelYear','chasis_no as vehicleChasisNo','demand', 'mileage'])
        .where('inventory.status = :status',{status})
        .andWhere('inventory.showroomShowroomId = :showroomId',{showroomId});
        const result = await getData.getRawMany();
        return result;
    }

    async getInventoryDetails(inventoryId: number): Promise<Inventory>{
        const Inventory = await this.inventoryRepository.findOne({relations:['showroom'],where: {inventory_id: inventoryId}})
        return Inventory;
         
    }

    async getMarketInventory(showroomId: number, status:InventoryStatus): Promise<GetInventroyDto[]>{

        // const { status, Keyword, showroomId } = getInventoryByFilterDto;
                // console.log(showroomId,status)
        const getData = this.inventoryRepository.createQueryBuilder('inventory')
        .leftJoin(VehicleType,'vehicleType', 'inventory.vehicleTypeTypeId = vehicleType.type_id')
        .select(['inventory_id as  inventoryId','make as vehicleMake','model as vehicleModel', 'variant as vehicleVariant', 'year as modelYear','demand', 'mileage', 'comments', 'vehicleType.type_name as vehicleType','grade'])
        .where('inventory.status = :status',{status})
        // .orWhere('(LOWER(`inventory`.`make`) LIKE LOWER(:Keyword) OR LOWER(inventory.model) LIKE LOWER(:Keyword) OR LOWER(inventory.variant) LIKE LOWER(:Keyword) OR inventory.year LIKE :Keyword OR inventory.demand LIKE :Keyword OR LOWER(inventory.color) LIKE LOWER(:Keyword) OR inventory.grade LIKE :Keyword )')
        .andWhere('inventory.showroomShowroomId != :showroomId',{showroomId})
        // if(Keyword)
        // getData.where('(LOWER(`inventory`.`make`) LIKE LOWER(:Keyword) OR LOWER(inventory.model) LIKE LOWER(:Keyword) OR LOWER(inventory.variant) LIKE LOWER(:Keyword) OR inventory.year LIKE :Keyword OR inventory.demand LIKE :Keyword OR LOWER(inventory.color) LIKE LOWER(:Keyword) OR inventory.grade LIKE :Keyword )')
        const result = await getData.getRawMany();
        // console.log(result);
        return result;
    }


    deleteInventory(inventoryId: number){
        
         this.stockValueAttributeRepository.delete({inventory:{inventory_id:inventoryId}})
        return this.inventoryRepository.delete({ inventory_id: inventoryId });
    }

    async updateInventory(updateInventoryDto: UpdateInventoryDto){
        const { vehicleVariant, vehicleModel, vehicleMake, vehicleChasisNo, status, comments, bodyColor, costPrice, dateOfPurchase, dateOfSale, demand, engineNo, grade, inventoryId, mileage, modelYear, regNo, vehicleType, sellingPrice, buyerId } = updateInventoryDto;
        if(vehicleVariant)
        await this.inventoryRepository.update({inventory_id:inventoryId},{variant:vehicleVariant});
        if(vehicleModel)
        await this.inventoryRepository.update({inventory_id:inventoryId}, {model:vehicleModel}); 
        if(vehicleMake)
        await this.inventoryRepository.update({inventory_id:inventoryId}, {make:vehicleMake});  
        if(vehicleChasisNo)
        await this.inventoryRepository.update({inventory_id:inventoryId}, {chasis_no:vehicleChasisNo});
        if(status)
        await this.inventoryRepository.update({inventory_id:inventoryId}, {status:status});
        if(comments)
        await this.inventoryRepository.update({inventory_id:inventoryId},{comments:comments});
        if(bodyColor)
        await this.inventoryRepository.update({inventory_id:inventoryId},{color:bodyColor});
        if(costPrice)
        await this.inventoryRepository.update({inventory_id:inventoryId},{price:costPrice});
        if(demand)
        await this.inventoryRepository.update({inventory_id:inventoryId},{demand:demand});
        if(dateOfPurchase)
        await this.inventoryRepository.update({inventory_id:inventoryId},{date_of_purchase:dateOfPurchase});
        if(dateOfSale)
        await this.inventoryRepository.update({inventory_id:inventoryId},{date_of_sale:dateOfSale});
        if(engineNo)
        await this.inventoryRepository.update({inventory_id:inventoryId},{engine_no:engineNo});
        if(grade)
        await this.inventoryRepository.update({inventory_id:inventoryId},{grade:grade});
        if(mileage)
        await this.inventoryRepository.update({inventory_id:inventoryId},{mileage:mileage});
        if(modelYear)
        await this.inventoryRepository.update({inventory_id:inventoryId},{mileage:mileage});
        if(regNo)
        await this.inventoryRepository.update({inventory_id:inventoryId},{reg_no:regNo});
        if(vehicleType)
        await this.inventoryRepository.update({inventory_id:inventoryId},{vehicleType:vehicleType});
        if(sellingPrice)
        await this.inventoryRepository.update({inventory_id:inventoryId}, {selling_Price:sellingPrice});
        if(buyerId)
        await this.inventoryRepository.update({inventory_id:inventoryId},{buyer:{customer_id:buyerId}});
    }
    
}
