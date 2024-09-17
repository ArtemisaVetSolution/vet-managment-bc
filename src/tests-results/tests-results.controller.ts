import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors, StreamableFile, Res } from '@nestjs/common';
import { TestsResultsService } from './tests-results.service';
import { CreateTestResultDto } from './dto/create-test-result.dto';
import { UpdateTestResultDto } from './dto/update-test-result.dto';
import { TestResultQueryDto } from './dto/test-result-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadPath } from 'src/common/enums/upload-path.enum';
import { fileNameHelper } from './helpers/file-name.helper';
import { ApiDocCreateResult } from './decorators/test-results.decorators';
import { Response } from 'express';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';

@ApiTags('Tests Results')
@Controller('tests-results')
@CatchErrors()
export class TestsResultsController {
  constructor(private readonly testsResultsService: TestsResultsService) { }


  @ApiDocCreateResult(CreateTestResultDto)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UploadPath.TEST_RESULT,
        filename: fileNameHelper
      }),
    }),
  )
  @Post()
  create(
    @Body() createTestResultDto: CreateTestResultDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createTestResultDto.file = file;
    return this.testsResultsService.create(createTestResultDto)
  }

  @Get('/file/:id')
  downloadFile(
    @Param('id') id: number,
    @Res() res: Response) {
    return this.testsResultsService.downloadFile(+id, res)
  }

  @Get()
  findAllOrFilter(@Query() query: TestResultQueryDto) {
    return this.testsResultsService.findAllOrFilter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testsResultsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestResultDto: UpdateTestResultDto) {
    return this.testsResultsService.update(+id, updateTestResultDto);
  }
}
