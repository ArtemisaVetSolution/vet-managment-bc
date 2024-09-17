import { PartialType } from '@nestjs/swagger';
import { CreateMedicalHistoryRecordDto } from './create-medical-history-record.dto';

export class UpdateMedicalHistoryRecordDto extends PartialType(CreateMedicalHistoryRecordDto) {}
