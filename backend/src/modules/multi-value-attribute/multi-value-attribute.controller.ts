import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { MultiValueAttributeService } from './multi-value-attribute.service';
import { MultiValueAttributeDto } from './dto/multi-value-attribute.dto';

import { AuthGuard } from '@nestjs/passport';
import { MultiValueAttribute } from './entity/Multi-value-attribute';

@Controller('multi-value-attribute')
// @UseGuards(AuthGuard())
export class MultiValueAttributeController {
    constructor( private multiValueAttributeService: MultiValueAttributeService)
    {}

    // @Post('addMultivalueAttribute')
    // addMultiValueAttribute(@Body() addMultiValueAttributeDto: MultiValueAttributeDto ): Promise<MultiValueAttribute>{
    //     return this.multiValueAttributeService.addMultiValueAttributes(addMultiValueAttributeDto);
    // }

    @Get('/:attributeName')
    getMultiAttributeByAttributeId(@Param('attributeName') attributeName: string): Promise<MultiValueAttribute[]>{
        return this.multiValueAttributeService.getMultiValueAttributeByAttributeName(attributeName);
    }

    // @Delete('/:attributeValue')
    // @UsePipes(new ValidationPipe())
    // deleteMultiValueAttributeByValue(@Param('attributeValue') attributeValue: string):void{
    //     this.multiValueAttributeService.deleteMultiValueAttributeByValue(attributeValue);
    // }

    @Patch('/updateAttributeValue')
    @UsePipes(new ValidationPipe())
    updateMultiValueAttributeByValue(@Body() updateAttributeValueDto: MultiValueAttributeDto): Promise<MultiValueAttribute>{
        return this.multiValueAttributeService.updateMultValueAttributeByValue(updateAttributeValueDto);
    }
}
