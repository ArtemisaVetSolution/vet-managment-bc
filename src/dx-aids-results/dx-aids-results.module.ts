import { Module } from '@nestjs/common';
import { DxAidsResultsService } from './dx-aids-results.service';
import { DxAidsResultsController } from './dx-aids-results.controller';

@Module({
  controllers: [DxAidsResultsController],
  providers: [DxAidsResultsService],
})
export class DxAidsResultsModule {}
