import { applyDecorators, Type } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { ApiBadRequest, ApiCreated, ApiNotFound, ApiSuccessResponses, ApiSuccessResponsesArray, ApiUpdate } from "src/common/decorators/swagger.decorators";
import { CreateServiceDto } from "../dto/create-service.dto";
import { UpdateServiceDto } from "../dto/update-service.dto";


export function ApiDocCreateService<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Creates a new service',
            description: 'This endpoint allows to create a new service in the system.'
        }),
        ApiBody({
            type: CreateServiceDto
        }),
        ApiCreated(entity),
        ApiBadRequest()
    ) 
}

export function ApiDocGetServices<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Retrieves all services or filter them by shift or service',
            description: 'Retrieves a list of all the services in the system'
        }),
        ApiSuccessResponsesArray(entity),
        ApiNotFound()
    )
}

export function ApiDocGetOneService<T> (entity: Type<T>) {
    return applyDecorators ( 
        ApiOperation ({
            summary: 'Retrieve a service by its ID',
            description: 'Retrieves a service by its ID'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'service ID'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound()
    )
}

export function ApiDocUpdateService<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Updates one service by ID',
            description: 'This endpoint allows to update one service with the provided ID'
        }),
        ApiBody({
            type: UpdateServiceDto
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'service ID'
        }),
        ApiUpdate(entity),
        ApiBadRequest(),
        ApiNotFound()
    ) 
}

export function ApiDocDeleteService<T>(entity: Type<T>) {
    return applyDecorators ( 
        ApiOperation ({
            summary: 'Deletes a service by its ID',
            description: 'Delete a service by its ID'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'service ID'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound()
    )
}