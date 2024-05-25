import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, EntityManager, Repository } from 'typeorm';
import { InventoryDto } from './dto/inventory.dto';
import { InventoryStatus } from './inventory-status.enum';
import { Inventory } from './entity/Inventory';
import { Showroom } from '../showroom/entity/Showroom';
import { StockAttributeValue } from '../stock-attribute-value/entity/Stock-attribute-value';
import { GetInventroyDto } from './dto/getInventory.dto';
import { VehicleType } from '../vehicle-type/entity/Vehicle-type';
import { VehicleTypeAttribute } from '../vehicle-type-attribute/entity/Vehicle-type-attribute';
import { UpdateInventoryDto } from './dto/updateInventory.dto';
import { Investment } from '../investment/entity/Investment';
import { PictureService } from '../picture/picture.service';
import * as AWS from 'aws-sdk';
import { Picture } from '../picture/entity/Picture';
import { CustomerAndInvestor } from '../customer/entity/CustomerAndInvestor';
// import { Connection } from 'mysql2';


@Injectable()
export class InventoryService {

    AWS_S3_BUCKET = 'd-m-s';
    s3 = new AWS.S3({
      accessKeyId: 'AKIAZI2LGWUFHKKODIOG',
      secretAccessKey: '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',
    });
    constructor (
      private pictureService: PictureService,
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
        @InjectRepository(Investment)
        private  investmentRepository: Repository <Investment>,
        @InjectRepository(CustomerAndInvestor)
        private customerInvestorRepository: Repository <CustomerAndInvestor>,
        @InjectRepository(Picture)
        private readonly pictureRepository: Repository<Picture>,
        private readonly entityManager: EntityManager
    ){}

    async addInventory(addInventoryDto: InventoryDto): Promise<Inventory> {
        const {
            vehicleType, vehicleMake, vehicleModel, vehicleVariant, modelYear,
            vehicleChasisNo, costPrice, demand, dateOfPurchase, dateOfSale,
            bodyColor, engineNo, comments, grade, regNo, mileage, status,
            showroomId, stockAttributeValue, sellerId, investment
        } = addInventoryDto;
    
        if (investment.length > 0) {
            return await this.entityManager.transaction(async transactionalEntityManager => {
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
                inventory.showroom = await transactionalEntityManager.findOne(Showroom, { where: { showroom_id: showroomId } });
                inventory.seller = await transactionalEntityManager.findOne(CustomerAndInvestor, { where: { customer_and_investor_id: sellerId } });
    
                await transactionalEntityManager.save(Inventory,inventory);
    
                const inventoryId = inventory.inventory_id;
                const inventoryObj = await transactionalEntityManager.findOne(Inventory, { where: { inventory_id: inventoryId } });
    
                const typeId = await this.vehicleTypeRepository.getId(vehicleType);
                for (let i = 0; i < stockAttributeValue.length; i++) {
                    const stockAttributeattrValue = new StockAttributeValue();
                    stockAttributeattrValue.value = stockAttributeValue[i].value;
                    stockAttributeattrValue.vehicleTypeAttribute = await transactionalEntityManager.findOne(VehicleTypeAttribute, { where: { vehicleType: { type_id: typeId } } });
                    stockAttributeattrValue.inventory = inventoryObj;
                    await transactionalEntityManager.save(StockAttributeValue,stockAttributeattrValue);
                }
    
                for (let i = 0; i < investment.length; i++) {
                    // const investorId = await this.customerInvestorRepository.getId(investor[i]);
                    const { customer_and_investor_id, investment_amount } = addInventoryDto.investment[i];
                    // console.log(investmentAmount);
                    const getData = await transactionalEntityManager.createQueryBuilder(CustomerAndInvestor, 'customer_investor')
                        .select('capital_amount')
                        .where('customer_investor.customer_and_investor_id = :customer_and_investor_id', { customer_and_investor_id })
                        .getRawOne();
    
                    if (getData) {
                        const capitalAmount = getData.capital_amount;
                        const getCapitalAmount = capitalAmount + investment_amount;
                        await transactionalEntityManager.update(CustomerAndInvestor, { customer_and_investor_id }, { capital_amount: getCapitalAmount });
                    }
    
                    const investment = new Investment();
                    investment.investment_date = new Date();
                    investment.investment_amount = investment_amount;
                    investment.inventory = inventoryObj;
                    investment.investor = await transactionalEntityManager.findOneBy(CustomerAndInvestor,{customer_and_investor_id})
                    await transactionalEntityManager.save(Investment,investment);
                }
    
                return inventory;
            });
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


    async deleteInventory(inventoryId: number){
        try{
        //  await this.stockValueAttributeRepository.delete({inventory:{inventory_id:inventoryId}});
        //  await this.inventoryRepository.update({inventory_id:inventoryId},{vehicleType:null});
        //  await this.inventoryRepository.update({inventory_id:inventoryId},{seller:null});
        //  await this.inventoryRepository.update({inventory_id:inventoryId},{showroom:null});
        return await this.inventoryRepository.delete({ inventory_id: inventoryId });
        }catch (e) {
          throw new BadRequestException('This inventory item can not be deleted!');
        }
    }

    async updateInventory(updateInventoryDto: UpdateInventoryDto):Promise<Inventory>{
        const { variant, model, make, chasis_no, status, comments, color, price, date_of_purchase, date_of_sale, demand, engine_no, grade, inventory_id, mileage, year, reg_no, selling_Price, buyerId } = updateInventoryDto;
        const inventory = await this.inventoryRepository.findOneBy({inventory_id:inventory_id});
        inventory.variant = variant;
        inventory.make = make;
        inventory.model = model;
        inventory.chasis_no = chasis_no;
        inventory.status = status;
        inventory.comments = comments;
        inventory.color = color;
        inventory.price = price;
        inventory.date_of_purchase = date_of_purchase;
        inventory.date_of_sale = date_of_sale;
        inventory.demand = demand;
        inventory.engine_no = engine_no;
        inventory.grade = grade;
        inventory.mileage = mileage;
        inventory.year = year;
        inventory.reg_no = reg_no;
        // inventory.vehicleType = vehicleType;
        // if(selling_Price)
        inventory.selling_Price = selling_Price;
        if(buyerId)
        await this.inventoryRepository.update({inventory_id:inventory_id},{buyer:{customer_and_investor_id:buyerId}});
        return await this.inventoryRepository.save(inventory);
    }
    
    
      
    // async uploadPictureToS3(file: Express.Multer.File): Promise<string> {
    //     const s3 = new S3();
    //     // const { originalname } = file;
    //     const params = {
    //       Bucket: this.AWS_S3_BUCKET,
    //       Key: file.originalname,
    //       Body: file.buffer,
    //       ContentType: file.mimetype,
    //     };
    //     try {
    //       const uploadedObject = await s3.upload(params).promise();
    //     return uploadedObject.Location;
    //     } catch (e) {
    //       console.log(e);
    //     }
        
    //   }
    
    //   async savePictureUrlToDatabase(files: Express.Multer.File, inventoryObj: Inventory): Promise<Picture> {
    //     // console.log(files.length);
    //     // for(let i=0; i<files.length;i++){
    //     const url = await this.uploadPictureToS3(files);   // saving the file in aws and getting the url 
    //     const picture = new Picture();
    //     picture.link = url;
    //     picture.inventory = inventoryObj;
    //     return this.pictureRepository.save(picture);
    //     // }
    //   }

      // async uploadFile(file) {
      //   console.log(file);
      //   const { originalname } = file;
    
      //   return await this.s3_upload(
      //     file.buffer,
      //     this.AWS_S3_BUCKET,
      //     originalname,
      //     file.mimetype,
      //   );
      // }
    
      // async s3_upload(file, bucket, name, mimetype) {
      //   const params = {
      //     Bucket: bucket,
      //     Key: String(name),
      //     Body: file,
      //     ACL: 'public-read',
      //     ContentType: mimetype,
      //     ContentDisposition: 'inline',
      //     CreateBucketConfiguration: {
      //       LocationConstraint: 'ap-south-1',
      //     },
      //   };
    
      //   try {
      //     let s3Response = await this.s3.upload(params).promise();
      //     return s3Response;
      //   } catch (e) {
      //     console.log(e);
      //   }
      // }

      
}
