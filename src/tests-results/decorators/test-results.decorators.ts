import { Type, applyDecorators } from "@nestjs/common"
import { ApiOperation, ApiBody, ApiQuery, ApiParam, ApiConsumes } from "@nestjs/swagger"
import { ApiCreated, ApiBadRequest, ApiSuccessResponsesArray, ApiNotFound, ApiSuccessResponses } from "src/common/decorators/swagger.decorators"
import { CreateTestResultDto } from "../dto/create-test-result.dto"
import { UpdateTestResultDto } from "../dto/update-test-result.dto"

export function ApiDocCreateResult<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Creates a new diagnostic aid result',
            description: 'This endpoint allows to create a new diagnostic result.'
        }),
        ApiConsumes('multipart/form-data'),
        ApiBody({
            type: CreateTestResultDto
        }),
        ApiCreated(entity),
        ApiBadRequest()
    ) 
}

export function ApiDocGetResults<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Retrieves all results or filter them by patient, date, or service',
            description: 'Retrieves a list of all the results or filter them by patient, date, or service'
        }),
        ApiQuery({
            name: 'patientId',
            required: false,
            type: Number,
            description: 'The id of the patient to filter the results'
        }),
        ApiQuery({
            name: 'sericeId',
            required: false,
            type: Number,
            description: 'The id of the service to filter the results'
        }),
        ApiQuery({
            name: 'date',
            required: false,
            type: Date,
            description: 'Date of the test to filter the results'
        }),
        ApiSuccessResponsesArray(entity),
        ApiNotFound()
    )
}

export function ApiDocGetOneResult<T> (entity: Type<T>) {
    return applyDecorators ( 
        ApiOperation ({
            summary: 'Retrieve a result by its ID',
            description: 'Retrieves a result by its ID'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'Result ID'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound()
    )
}

export function ApiDocGetResultFile<T> (entity: Type<T>) {
    return applyDecorators ( 
        ApiOperation ({
            summary: 'Retrieve the file of result by its ID',
            description: 'Opens the file of the result by its ID'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'Result ID'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound(),
        ApiBadRequest()
    )
}

export function ApiDocUpdateResult<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Updates one result by ID',
            description: 'This endpoint allows to update one patient with the provided ID'
        }),
        ApiBody({
            type: UpdateTestResultDto
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
