import { Test, TestingModule } from '@nestjs/testing';
import { TestsResultsService } from './tests-results.service';

describe('TestResultsService', () => {
  let service: TestsResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestsResultsService],
    }).compile();

    service = module.get<TestsResultsService>(TestsResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
