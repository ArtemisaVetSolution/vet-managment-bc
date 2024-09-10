import { applyDecorators, Type } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam } from "@nestjs/swagger";
import { CreateTutorDto } from "../dto/create-tutor.dto";
import { ApiBadRequest, ApiCreated, ApiNotFound, ApiSuccessResponses, ApiSuccessResponsesArray } from "src/common/decorators/swagger.decorators";
import { UpdateTutorDto } from "../dto/update-tutor.dto";

export function ApiDocCreateTutor<T> (entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Create a new tutor',
            description: 'This endpoint allows to create a new tutor'
        }),
        ApiBody({
            type: CreateTutorDto
        }),
        ApiCreated(entity),
        ApiBadRequest()
    )
}

export function ApiDocGetAllTutors<T> (entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Retrieves all tutors',
            description: 'This endpoint retrieves a list of all tutors'
        }),
        ApiSuccessResponsesArray(entity),
        ApiNotFound()
    )
}

export function ApiDocGetOneTutor<T> (entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Retrieves one tutors by ID',
            description: 'This endpoint retrieves a tutor by its ID'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'Tutor ID'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound(), 
        ApiBadRequest()
    )
}

export function ApiDocUpdateTutor<T> (entity: Type<T>) {
    return applyDecorators (
        ApiOperation({
            summary: 'Update a tutor',
            description: 'This endpoint allow to update a tutor information'
        }),
        ApiBody({
            type: UpdateTutorDto
        }),
        ApiSuccessResponses(entity),
        ApiBadRequest(),
        ApiNotFound()
    )
}

export function ApiDocDeletetutor<T> (entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Deletes a tutor',
            description: 'This endpoint soft-deletes a tutor from the database'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'Tutor ID'
        })
    )
}