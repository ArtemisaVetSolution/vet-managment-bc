import { applyDecorators, Type } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam } from "@nestjs/swagger";
import { CreatePatientDto } from "../dto/create-patient.dto";
import { ApiBadRequest, ApiCreated, ApiNotFound, ApiSuccessResponses, ApiSuccessResponsesArray } from "src/common/decorators/swagger.decorators";

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
            summary: 'Retrieves all patients',
            description: 'Retrieves a list of all the patients in the system'
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
            type: String,
            description: 'Patient ID'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound()
    )
}

export function ApiDocGetTutorPatient<T> (entity: Type<T>) {
    return applyDecorators ( 
        ApiOperation ({
            summary: 'Retrieve a list of patient by tutor ID',
            description: 'Retrieve a list of patient by tutor ID'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: String,
            description: 'Tutor ID'
        }),
        ApiSuccessResponsesArray(entity),
        ApiNotFound()
    )
}