import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum } from "class-validator";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { ShiftsNames } from "src/common/enums/shifts.enum";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateCollaboratorDto extends CreateUserDto {

  @ApiProperty({ description: `Shift name of the collaborator must be: ${ShiftsNames.MORNING}, ${ShiftsNames.AFTERNOON}  `, example: 'Morning'})
  @Transform(({ value: shiftName }) => shiftName.toLowerCase())
  @IsEnum(ShiftsNames)
  @IsNotEmpty()
  shiftName: ShiftsNames;

  @ApiProperty({ description: 'Array of services IDs that the collaborator will provide', example: [1, 2]})
  @IsArray()
  servicesId: number[]

}
