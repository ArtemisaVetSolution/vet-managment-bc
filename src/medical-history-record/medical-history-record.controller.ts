import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { MedicalHistoryRecordService } from './medical-history-record.service';
import { CreateMedicalHistoryRecordDto } from './dto/create-medical-history-record.dto';
import { UpdateMedicalHistoryRecordDto } from './dto/update-medical-history-record.dto';
import { Response } from 'express';
import { PdfGeneratorService } from 'src/pdf-generator/pdf-generator.service';

@Controller('medical-history-record')
export class MedicalHistoryRecordController {
  constructor(private readonly medicalHistoryRecordService: MedicalHistoryRecordService
  ) { }

  @Post()
  create(@Body() createMedicalHistoryRecordDto: CreateMedicalHistoryRecordDto) {
    return this.medicalHistoryRecordService.create(createMedicalHistoryRecordDto);
  }

  // @Get('file/:id')
  // async generatePdf(@Param('id') id: string, @Res() res: Response) {
  //   const pdfBuffer = await this.medicalHistoryRecordService.generatePdf(id);
  //   res.set({
  //     'Content-Type': 'application/pdf',
  //     'Content-Disposition': 'inline; filename="historia_clinica.pdf"',
  //     'Content-Length': pdfBuffer.length,
  //   });
  //   res.end(pdfBuffer);
  // }

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
  }

  @Get()
  findAll() {
    return this.medicalHistoryRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalHistoryRecordService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalHistoryRecordDto: UpdateMedicalHistoryRecordDto) {
    return this.medicalHistoryRecordService.update(+id, updateMedicalHistoryRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalHistoryRecordService.remove(+id);
  }
}
