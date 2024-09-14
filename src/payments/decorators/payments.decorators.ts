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

// export function ApiDocGetpayments<T>(entity: Type<T>) {
//     return applyDecorators(
//         ApiOperation({
//             summary: 'Retrieves all payments or filter them by shift or service',
//             description: 'Retrieves a list of all the payments in the system'
//         }),
//         ApiQuery({
//             name: 'shift',
//             required: false,
//             type: String,
//             description: 'The name of the shift to filter the payments',
//             example: "morning"
//         }),
//         ApiQuery({
//             name: 'serviceId',
//             required: false,
//             type: Number,
//             description: 'The ID of the service to filter the payments',
//             example: 1
//         }),
//         ApiSuccessResponsesArray(entity),
//         ApiNotFound()
//     )
// }

// export function ApiDocGetOnepayment<T> (entity: Type<T>) {
//     return applyDecorators ( 
//         ApiOperation ({
//             summary: 'Retrieve a payment by its ID',
//             description: 'Retrieves a payment by its ID'
//         }),
//         ApiParam({
//             name: 'id',
//             required: true,
//             type: Number,
//             description: 'payment ID'
//         }),
//         ApiSuccessResponses(entity),
//         ApiNotFound()
//     )
// }

// export function ApiDocUpdatepayment<T>(entity: Type<T>) {
//     return applyDecorators(
//         ApiOperation({
//             summary: 'Updates one payment by ID',
//             description: 'This endpoint allows to update one payment with the provided ID'
//         }),
//         ApiBody({
//             type: UpdatePaymentDto
//         }),
//         ApiParam({
//             name: 'id',
//             required: true,
//             type: Number,
//             description: 'payment ID'
//         }),
//         ApiUpdate(entity),
//         ApiBadRequest(),
//         ApiNotFound()
//     ) 
// }

// export function ApiDocRestorepayment<T>(entity: Type<T>) {
//   return applyDecorators(
//       ApiOperation({
//           summary: 'Restore one payment by ID',
//           description: 'This endpoint allows to restore one payment with the provided ID'
//       }),
//       // ApiBody({
//       //     type: UpdatepaymentDto
//       // }),
//       ApiParam({
//           name: 'id',
//           required: true,
//           type: Number,
//           description: 'payment ID'
//       }),
//       ApiUpdate(entity),
//       ApiBadRequest(),
//       ApiNotFound()
//   ) 
// }

// export function ApiDocDeletepayment<T>(entity: Type<T>) {
//     return applyDecorators ( 
//         ApiOperation ({
//             summary: 'Deletes a payment by its ID',
//             description: 'Delete a payment by its ID'
//         }),
//         ApiParam({
//             name: 'id',
//             required: true,
//             type: Number,
//             description: 'payment ID'
//         }),
//         ApiSuccessResponses(entity),
//         ApiNotFound()
//     )
// }