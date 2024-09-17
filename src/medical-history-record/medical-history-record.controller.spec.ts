import { Test, TestingModule } from '@nestjs/testing';
import { MedicalHistoryRecordController } from './medical-history-record.controller';
import { MedicalHistoryRecordService } from './medical-history-record.service';

describe('MedicalHistoryRecordController', () => {
  let controller: MedicalHistoryRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalHistoryRecordController],
      providers: [MedicalHistoryRecordService],
    }).compile();

    controller = module.get<MedicalHistoryRecordController>(MedicalHistoryRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
