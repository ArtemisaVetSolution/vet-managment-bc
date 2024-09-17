import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { MedicalHistoryRecordService } from './medical-history-record.service';
import { CreateMedicalHistoryRecordDto } from './dto/create-medical-history-record.dto';
import { UpdateMedicalHistoryRecordDto } from './dto/update-medical-history-record.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { MedicalHistoryQueryDto } from './dto/medical-history-record-query.dto';
import { ApiDocCreateRecord, ApiDocFilterRecords, ApiDocGetFile, ApiDocGetOneRecord } from './decorators/medical-history.decorators';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';

@ApiTags('Medical History')
@Controller('medical-history-record')
@CatchErrors()
export class MedicalHistoryRecordController {
  constructor(private readonly medicalHistoryRecordService: MedicalHistoryRecordService
  ) { }

  @ApiDocCreateRecord(CreateMedicalHistoryRecordDto)
  @Post()
  create(@Body() createMedicalHistoryRecordDto: CreateMedicalHistoryRecordDto) {
    return this.medicalHistoryRecordService.create(createMedicalHistoryRecordDto);
  }

  @ApiDocGetFile(CreateMedicalHistoryRecordDto)
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
  @Get()
  findAll(@Query() query: MedicalHistoryQueryDto) {
    return this.medicalHistoryRecordService.findAll(query);
  }

  @ApiDocGetOneRecord(CreateMedicalHistoryRecordDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalHistoryRecordService.findOne(id);
  }
}
