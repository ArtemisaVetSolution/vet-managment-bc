import { Test, TestingModule } from '@nestjs/testing';
import { DxAidsResultsController } from './dx-aids-results.controller';
import { DxAidsResultsService } from './dx-aids-results.service';

describe('DxAidsResultsController', () => {
  let controller: DxAidsResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DxAidsResultsController],
      providers: [DxAidsResultsService],
    }).compile();

    controller = module.get<DxAidsResultsController>(DxAidsResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
