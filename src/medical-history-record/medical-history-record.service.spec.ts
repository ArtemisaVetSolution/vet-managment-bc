import { Test, TestingModule } from '@nestjs/testing';
import { MedicalHistoryRecordService } from './medical-history-record.service';

describe('MedicalHistoryRecordService', () => {
  let service: MedicalHistoryRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalHistoryRecordService],
    }).compile();

    service = module.get<MedicalHistoryRecordService>(MedicalHistoryRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
