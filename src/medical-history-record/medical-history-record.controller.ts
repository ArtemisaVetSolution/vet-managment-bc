import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { MedicalHistoryRecordService } from './medical-history-record.service';
import { CreateMedicalHistoryRecordDto } from './dto/create-medical-history-record.dto';
import { UpdateMedicalHistoryRecordDto } from './dto/update-medical-history-record.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { MedicalHistoryQueryDto } from './dto/medical-history-record-query.dto';
import { ApiDocCreateRecord, ApiDocFilterRecords, ApiDocGetFile, ApiDocGetOneRecord } from './decorators/medical-history.decorators';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { PathName, VerifyAuthService } from 'src/common/decorators/auth.decorator';
import { Leave, Path } from 'src/common/enums';

@ApiTags('Medical History')
@PathName(Path.MEDICAL_HISTORY_RECORD)
@Controller('medical-history-record')
@CatchErrors()
export class MedicalHistoryRecordController {
  constructor(private readonly medicalHistoryRecordService: MedicalHistoryRecordService
  ) { }

  @ApiDocCreateRecord(CreateMedicalHistoryRecordDto)
  @VerifyAuthService(Leave.CAN_CREATE)
  @Post()
  create(@Body() createMedicalHistoryRecordDto: CreateMedicalHistoryRecordDto) {
    return this.medicalHistoryRecordService.create(createMedicalHistoryRecordDto);
  }
  
  @ApiDocGetFile(CreateMedicalHistoryRecordDto)
  @VerifyAuthService(Leave.CAN_READ_OWN)
  @Get('file/:id')
  async generatePdf(
    @Param('id') id: string,
    @Res() res: Response) {
    const doc = await this.medicalHistoryRecordService.generatePdf(id)

    res.set(
      {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="historia_clinica.pdf"'
      }
    )
    doc.pipe(res);
    doc.end();

    return 'PDF generated succesfully';
  }

  @ApiDocFilterRecords(CreateMedicalHistoryRecordDto)
  @VerifyAuthService(Leave.CAN_READ)
  @Get()
  findAll(@Query() query: MedicalHistoryQueryDto) {
    return this.medicalHistoryRecordService.findAll(query);
  }
  
  @ApiDocGetOneRecord(CreateMedicalHistoryRecordDto)
  @VerifyAuthService(Leave.CAN_READ_OWN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalHistoryRecordService.findOne(id);
  }
}
