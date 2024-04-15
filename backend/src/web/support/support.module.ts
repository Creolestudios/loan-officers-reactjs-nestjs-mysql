import { Module } from '@nestjs/common';
import { SupportService } from './support.service';
import { SupportController } from './support.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Support_Guides } from 'src/shared/entity/support_guides.entity';
import { Support_Guides_Categories } from 'src/shared/entity/support_guides_categories.entity';
import { Faqs } from 'src/shared/entity/faqs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Support_Guides, Support_Guides_Categories, Faqs])],
  controllers: [SupportController],
  providers: [SupportService],
})
export class SupportModule {}
