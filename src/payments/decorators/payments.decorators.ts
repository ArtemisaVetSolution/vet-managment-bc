import { applyDecorators, Type } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { ApiBadRequest, ApiCreated, ApiNotFound, ApiSuccessResponses, ApiSuccessResponsesArray, ApiUpdate } from "src/common/decorators/swagger.decorators";
import { CreatePaymentDto } from "../dto/create-payment.dto";



export function ApiDocCreatePayment<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Creates a new payment',
            description: 'This endpoint allows to create a new payment in the system.'
        }),
        ApiBody({
            type: CreatePaymentDto
        }),
        ApiCreated(entity),
        ApiBadRequest()
    ) 
}

export function ApiDocGetpayments<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Retrieves all payments in the system',
            description: 'Retrieves a list of all the payments in the system'
        }),
        ApiSuccessResponsesArray(entity),
        ApiNotFound()
    )
}

export function ApiDocGetPaymentsByTutor<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Retrieves all payments in the system by tutor',
            description: 'Retrieves a list of all the payments in the system by tutor'
        }),
        ApiSuccessResponsesArray(entity),
        ApiNotFound()
    )
}

export function ApiDocGetPaymentsByAppoinment<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Retrieves all payments in the system by appointment',
            description: 'Retrieves a list of all the payments in the system by appointment'
        }),
        ApiSuccessResponsesArray(entity),
        ApiNotFound()
    )
}



export function ApiDocDeletePayment<T>(entity: Type<T>) {
    return applyDecorators ( 
        ApiOperation ({
            summary: 'Deletes a payment by its ID',
            description: 'Delete a payment by its ID'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'payment ID'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound()
    )
}