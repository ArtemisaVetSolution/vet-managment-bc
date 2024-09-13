import { Test, TestingModule } from '@nestjs/testing';
import { TestsResultsController } from './tests-results.controller';
import { TestsResultsService } from './tests-results.service';

describe('TestResultsController', () => {
  let controller: TestsResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestsResultsController],
      providers: [TestsResultsService],
    }).compile();

    controller = module.get<TestsResultsController>(TestsResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
