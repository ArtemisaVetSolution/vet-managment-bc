import { applyDecorators, Type } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { CreateMedicalHistoryRecordDto } from "../dto/create-medical-history-record.dto";
import { ApiBadRequest, ApiCreated, ApiNotFound, ApiSuccessResponses, ApiSuccessResponsesArray } from "src/common/decorators/swagger.decorators";

export function ApiDocCreateRecord<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Creates a new medical history record',
            description: 'This endpoint allows to create a new medical history record'
        }),
        ApiBody({
            type: CreateMedicalHistoryRecordDto
        }),
        ApiCreated(entity),
        ApiBadRequest()
    )
}

export function ApiDocFilterRecords<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Filter records by patient ID or appointment ID.',
            description: 'This endpoint filters records by patient ID or appointment ID. Otherwise, returns all records.'
        }),
        ApiQuery({
            name: 'patientId',
            required: false,
            type: Number,
            description: 'Id of the patient'
        }),
        ApiQuery({
            name: 'appointmentId',
            required: false,
            type: Number,
            description: 'Id of the appointment'
        }),
        ApiSuccessResponsesArray(entity),
        ApiNotFound(),
        ApiBadRequest()
    )
}

export function ApiDocGetOneRecord<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Retrieves a record by its ID',
            description: 'Retrieves a record by its ID'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: String,
            description: 'Record ID'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound()
    )
}

export function ApiDocGetFile<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Get pdf file of medical history record',
            description: 'This endpoint will open a new window with the pdf file of the medical history record'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: String,
            description: 'Record ID'
        }),
        ApiSuccessResponses(entity),
        ApiBadRequest(),
        ApiNotFound()
    )
}