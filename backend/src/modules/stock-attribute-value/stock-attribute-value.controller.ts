import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StockAttributeValueService } from './stock-attribute-value.service';
import { StockAttributeValueDto } from './stock-attribute-value.dto';
import { StockAttributeValue } from './Stock-attribute-value';

@Controller('stock-attribute-value')
export class StockAttributeValueController {
    constructor(private stockAttributeValueService: StockAttributeValueService)
    {}

    @Post('addStockAttributeValue')
    addStockAttributeValue(@Body() addStockAttributeValueDto: StockAttributeValueDto): Promise<StockAttributeValue>{
        return this.stockAttributeValueService.addStockAttributeValue(addStockAttributeValueDto);
    }

    @Get('/:inventoryId')
    getStockAttributeValue(@Param('inventoryId') invetoryId: number): Promise<StockAttributeValue[]>{
        return this.stockAttributeValueService.getStockAttributeValue(invetoryId);
    }
}
