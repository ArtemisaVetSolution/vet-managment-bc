import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtValidationGuard } from "../guard/jwt.guard";

export function PrivateService() {
    return applyDecorators(
        UseGuards(JwtValidationGuard),
        ApiBearerAuth('access-token')
    );
}