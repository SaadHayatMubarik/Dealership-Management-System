import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MultiValueAttributeService } from './multi-value-attribute.service';
import { MultiValueAttributeDto } from './dto/multi-value-attribute.dto';
import { MultiValueAttribute } from './entities/Multi-value-attribute';

@Controller('multi-value-attribute')
export class MultiValueAttributeController {
    constructor( private multiValueAttributeService: MultiValueAttributeService)
    {}

    // @Post('addMultivalueAttribute')
    // addMultiValueAttribute(@Body() addMultiValueAttributeDto: MultiValueAttributeDto ): Promise<MultiValueAttribute>{
    //     return this.multiValueAttributeService.addMultiValueAttributes(addMultiValueAttributeDto);
    // }

    @Get('/:attributeName')
    getMultiAttributeByAttributeId(@Param('attributeName') attributeName: string): Promise<MultiValueAttribute[]>{
        return this.multiValueAttributeService.getMultiValueAttributeByAttributeId(attributeName);
    }

    // @Delete('/:attributeValue')
    // @UsePipes(new ValidationPipe())
    // deleteMultiValueAttributeByValue(@Param('attributeValue') attributeValue: string):void{
    //     this.multiValueAttributeService.deleteMultiValueAttributeByValue(attributeValue);
    // }

    @Patch('/attributeValue')
    @UsePipes(new ValidationPipe())
    updateMultiValueAttributeByValue(@Param('attributeValue') attributeValue: string){
        
    }
}
