import { applyDecorators, Type } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { CreatePatientDto } from "../dto/create-patient.dto";
import { ApiBadRequest, ApiCreated, ApiNotFound, ApiSuccessResponses, ApiSuccessResponsesArray } from "src/common/decorators/swagger.decorators";
import { UpdatePatientDto } from "../dto/update-patient.dto";

export function ApiDocCreatePatient<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Creates a new patient',
            description: 'This endpoint allows to create a new patient in the system.'
        }),
        ApiBody({
            type: CreatePatientDto
        }),
        ApiCreated(entity),
        ApiBadRequest()
    ) 
}

export function ApiDocGetPatients<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Retrieves all patients or filter by tutor or specie',
            description: 'Retrieves a list of all the patients in the system or filters by query params by tutor or specie'
        }),
        ApiQuery({
            name: 'tutorId',
            required: false,
            type: Number,
            description: 'The id of the tutor to filter the patients',
            example: 1
        }),
        ApiQuery({
            name: 'specie',
            required: false,
            type: String,
            description: 'The specie to filter the patients',
            example: 'Felino'
        }),
        ApiSuccessResponsesArray(entity),
        ApiNotFound()
    )
}

export function ApiDocGetOnePatient<T> (entity: Type<T>) {
    return applyDecorators ( 
        ApiOperation ({
            summary: 'Retrieve a patient by its ID',
            description: 'Retrieves a patient by its ID'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'Patient ID'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound()
    )
}

export function ApiDocUpdatePatient<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Updates one patient by ID',
            description: 'This endpoint allows to update one patient with the provided ID'
        }),
        ApiBody({
            type: UpdatePatientDto
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'Patient ID'
        }),
        ApiCreated(entity),
        ApiBadRequest(),
        ApiNotFound()
    ) 
}

export function ApiDocDeletePatient<T>(entity: Type<T>) {
    return applyDecorators ( 
        ApiOperation ({
            summary: 'Deletes a patient by its ID',
            description: 'Delete a patient by its ID'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'Patient ID'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound()
    )
}