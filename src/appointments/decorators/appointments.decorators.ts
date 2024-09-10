import { applyDecorators, Type } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { CreateAppointmentDto } from "../dto/create-appointment.dto";
import { ApiBadRequest, ApiCreated, ApiNotFound, ApiSuccessResponses, ApiSuccessResponsesArray } from "src/common/decorators/swagger.decorators";
import { UpdateAppointmentDto } from "../dto/update-appointment.dto";

export function ApiDocCreateAppointment<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Creates a new appointment',
            description: 'This endpoint allows to create a new appointment'
        }),
        ApiBody({
            type: CreateAppointmentDto
        }),
        ApiCreated(entity),
        ApiBadRequest()
    )
}

export function ApiDocGetAppointments<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Get appointments by query filter, otherwise returns all',
            description: 'This endpoint allows you to get appointments, filtering by query params, otherwise returns all the appointments'
        }),
        ApiQuery({
            name: 'patientId',
            required: false,
            type: Number,
            description: 'The id of the patient'
        }),
        ApiQuery({
            name: 'serviceId',
            required: false,
            type: Number,
            description: 'The id of the service'
        }),
        ApiQuery({
            name: 'date',
            required: false,
            type: Date,
            description: 'The date you want to filter appointments'
        }),
        ApiSuccessResponsesArray(entity),
        ApiBadRequest(),
        ApiNotFound()
    )
}

export function ApiDocGetOneAppointment<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Retrieves an appointment by its ID',
            description: 'Retrieves a appointment by its ID'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'Appointment ID'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound()
    )
}

export function ApiDocUpdateAppointment<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Changes the status of an appointment by ID',
            description: 'This endpoint allows to update the status of the appointment with the provided ID'
        }),
        ApiBody({
            type: UpdateAppointmentDto
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'Appointment ID'
        }),
        ApiCreated(entity),
        ApiBadRequest(),
        ApiNotFound()
    )
}