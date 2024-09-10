import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiDocCreateTutor, ApiDocDeletetutor, ApiDocGetAllTutors, ApiDocGetOneTutor, ApiDocUpdateTutor } from './decorators/tutors.decorators';
import { TutorResponseDto } from './dto/tutor-response.dto';

@ApiTags('Tutors')
@ApiExtraModels(TutorResponseDto)
@Controller('tutors')
export class TutorsController {
  constructor(private readonly tutorsService: TutorsService) {}

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
