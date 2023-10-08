import { Module } from '@nestjs/common';
import { MultiValueAttributeService } from './multi-value-attribute.service';

@Module({
  providers: [MultiValueAttributeService]
})
export class MultiValueAttributeModule {}
