
import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";

import { ApiBearerAuth } from "@nestjs/swagger";

import { JwtValidationGuard } from "../guards/jwt.guard";
import { LeavesGuard } from "../guards/leaves.guard";
import { Leave, Path } from "../enums";

export function VerifyAuthService(permissions: Leave){
    return applyDecorators(
        SetMetadata('permissions', permissions),
        UseGuards(JwtValidationGuard, LeavesGuard),
        ApiBearerAuth('access-token')
    );
}

export const PathName = (pathname: Path) => 
    SetMetadata('pathname', pathname);