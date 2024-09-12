import { Test, TestingModule } from '@nestjs/testing';
import { DxAidsResultsService } from './dx-aids-results.service';

describe('DxAidsResultsService', () => {
  let service: DxAidsResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DxAidsResultsService],
    }).compile();

    service = module.get<DxAidsResultsService>(DxAidsResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
