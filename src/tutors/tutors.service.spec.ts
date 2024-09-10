import { Test, TestingModule } from '@nestjs/testing';
import { TutorsService } from './tutors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutor } from './entities/tutor.entity';

describe('TutorsService', () => {
  let service: TutorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Tutor])],
      providers: [TutorsService],
    }).compile();

    service = module.get<TutorsService>(TutorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
