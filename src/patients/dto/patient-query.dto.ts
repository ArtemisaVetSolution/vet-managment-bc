import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNumber, IsOptional, Min } from "class-validator";
import { Species } from "src/common/enums/species.enum";

export class PatientQueryDto {
    @ApiPropertyOptional({
        description: 'The specie to filter patients (Felino, Canino, Ave, Roedor, Conejo, Otro)', example: 'Felino'
    })
    @IsOptional()
    @IsEnum(Species)
    specie?: Species;

    @ApiPropertyOptional({
        description: 'The tutor ID', example: 1
    })
    @IsOptional()
    @IsNumber()
    tutorId?: number;

    @ApiPropertyOptional({
        description: 'The tutor identity', example: 112365478
    })
    @IsOptional()
    @IsNumber()
    tutorIdentity?: number;

    @ApiPropertyOptional({
        description: 'Limit of patients to return per page',
        example: 10
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    limit?: number = 10;

    @ApiPropertyOptional({
        description: 'Page number for pagination',
        example: 1
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number = 1;
}