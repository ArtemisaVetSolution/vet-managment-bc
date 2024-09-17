import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsDateString, isDecimal, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Gender } from "src/common/enums/gender.enum";
import { Species } from "src/common/enums/species.enum";

export class CreatePatientDto {

    @ApiProperty({ description: 'The name of the patient', example: 'Lulú' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'The specie of the patient must be one of the followings: Felino, Canino, Ave, Roedor, Conejo, Otro', example: 'Felino', type: String, required: true })
    @IsEnum(Species)
    @IsNotEmpty()
    specie: Species;

    @ApiPropertyOptional({ description: 'The breed of the patient if applies', example: 'Criollo', type: String })
    @IsOptional()
    @IsString()
    breed: string;

    @ApiProperty({ description: 'The gender of the patient must be one of the followings: Hembra, Macho, Desconocido', example: 'Hembra', type: String })
    @IsEnum(Gender)
    gender: Gender;

    @ApiPropertyOptional({ description: 'The aproximated date of birth of the patient', example: '2012-09-28', type: Date })
    @IsOptional()
    @Transform(({ value }) => value ? new Date(value) : null)
    @IsDate()
    dob: Date;

    @ApiPropertyOptional({ description: 'Weight of the patient en KG', example: 3.6, type: Number, format: 'float' })
    @IsOptional()
    @IsNumber()
    weight: number;

    @ApiPropertyOptional({ description: 'Description of the alimentation of the patient', example: 'Royal Canin con alimento húmedo casero', type: String })
    @IsOptional()
    @IsString()
    alimentation: string;

    @ApiPropertyOptional({description: 'Color of the patient', example: 'Blanco', type: String})
    @IsString()
    color: string;

    @ApiProperty({ description: 'Tutor id', example: 1, type: Number })
    @IsNumber()
    tutorId: number;
}
