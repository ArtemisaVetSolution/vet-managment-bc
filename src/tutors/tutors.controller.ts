import { Controller, Get, Post, Body, Patch, Param, Delete, StreamableFile, Res, Inject } from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiDocCreateTutor, ApiDocDeletetutor, ApiDocGetAllTutors, ApiDocGetOneTutor, ApiDocUpdateTutor } from './decorators/tutors.decorators';
import { TutorResponseDto } from './dto/tutor-response.dto';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { LoggerService } from 'src/common/services';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';

@ApiTags('Tutors')
@ApiExtraModels(TutorResponseDto)
@Controller('tutors')
export class TutorsController {
  constructor(
    private readonly tutorsService: TutorsService,
    @Inject(LoggerService)
    public readonly loggerService: LoggerService,
    @Inject(ExceptionHandlerService)
    public readonly exceptionHandlerService: ExceptionHandlerService,
  ) { }

  @ApiDocCreateTutor(CreateTutorDto)
  @Post()
  create(@Body() createTutorDto: CreateTutorDto) {
    return this.tutorsService.create(createTutorDto);
  }

  @ApiDocGetAllTutors(TutorResponseDto)
  @Get()
  findAll() {
    return this.tutorsService.findAll();
  }

  @ApiDocGetOneTutor(TutorResponseDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tutorsService.findOne(+id);
  }

  @ApiDocUpdateTutor(TutorResponseDto)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTutorDto: UpdateTutorDto) {
    return this.tutorsService.update(+id, updateTutorDto);
  }

  @ApiDocDeletetutor(TutorResponseDto)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutorsService.remove(+id);
  }


}
