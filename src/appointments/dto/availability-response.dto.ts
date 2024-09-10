import { ApiProperty } from "@nestjs/swagger";

export class AvailabilityResponse {
    @ApiProperty({ example: ['08:00:00', '12:00:00', '13:00:00']})
    availableHours: string[];
}