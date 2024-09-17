import { Controller, Get, Post, Body, Patch, Param, Delete, StreamableFile, Res } from '@nestjs/common';
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
import { PathName, VerifyAuthService } from 'src/common/decorators/auth.decorator';
import { Leave, Path } from 'src/common/enums';

@ApiTags('Tutors')
@ApiExtraModels(TutorResponseDto)
@PathName(Path.TUTORS)
@Controller('tutors')
@CatchErrors()
export class TutorsController {
  constructor(private readonly tutorsService: TutorsService) { }

  @ApiDocCreateTutor(CreateTutorDto)
  @VerifyAuthService(Leave.CAN_CREATE)
  @Post()
  create(@Body() createTutorDto: CreateTutorDto) {
    return this.tutorsService.create(createTutorDto);
  }
  
  @ApiDocGetAllTutors(TutorResponseDto)
  @VerifyAuthService(Leave.CAN_READ)
  @Get()
  findAll() {
    return this.tutorsService.findAll();
  }
  
  @ApiDocGetOneTutor(TutorResponseDto)
  @VerifyAuthService(Leave.CAN_READ_OWN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tutorsService.findOne(+id);
  }
  
  @ApiDocUpdateTutor(TutorResponseDto)
  @VerifyAuthService(Leave.CAN_UPDATE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTutorDto: UpdateTutorDto) {
    return this.tutorsService.update(+id, updateTutorDto);
  }
  
  @ApiDocDeletetutor(TutorResponseDto)
  @VerifyAuthService(Leave.CAN_DELETE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutorsService.remove(+id);
  }


}
