import { applyDecorators, Type } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { ApiBadRequest, ApiCreated, ApiNotFound, ApiSuccessResponses, ApiSuccessResponsesArray, ApiUpdate } from "src/common/decorators/swagger.decorators";
import { CreateCollaboratorDto } from "../dto/create-collaborator.dto";
import { UpdateCollaboratorDto } from "../dto/update-collaborator.dto";


export function ApiDocCreateCollaborator<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Creates a new collaborator',
            description: 'This endpoint allows to create a new collaborator in the system.'
        }),
        ApiBody({
            type: CreateCollaboratorDto
        }),
        ApiCreated(entity),
        ApiBadRequest()
    ) 
}

export function ApiDocGetCollaborators<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Retrieves all collaborators or filter them by shift or service',
            description: 'Retrieves a list of all the collaborators in the system'
        }),
        ApiQuery({
            name: 'shift',
            required: false,
            type: String,
            description: 'The name of the shift to filter the collaborators',
            example: "morning"
        }),
        ApiQuery({
            name: 'serviceId',
            required: false,
            type: Number,
            description: 'The ID of the service to filter the collaborators',
            example: 1
        }),
        ApiSuccessResponsesArray(entity),
        ApiNotFound()
    )
}

export function ApiDocGetOneCollaborator<T> (entity: Type<T>) {
    return applyDecorators ( 
        ApiOperation ({
            summary: 'Retrieve a collaborator by its ID',
            description: 'Retrieves a collaborator by its ID'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'Collaborator ID'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound()
    )
}

export function ApiDocUpdateCollaborator<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Updates one collaborator by ID',
            description: 'This endpoint allows to update one collaborator with the provided ID'
        }),
        ApiBody({
            type: UpdateCollaboratorDto
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'Collaborator ID'
        }),
        ApiUpdate(entity),
        ApiBadRequest(),
        ApiNotFound()
    ) 
}

export function ApiDocRestoreCollaborator<T>(entity: Type<T>) {
  return applyDecorators(
      ApiOperation({
          summary: 'Restore one collaborator by ID',
          description: 'This endpoint allows to restore one collaborator with the provided ID'
      }),
      // ApiBody({
      //     type: UpdateCollaboratorDto
      // }),
      ApiParam({
          name: 'id',
          required: true,
          type: Number,
          description: 'Collaborator ID'
      }),
      ApiUpdate(entity),
      ApiBadRequest(),
      ApiNotFound()
  ) 
}

export function ApiDocDeleteCollaborator<T>(entity: Type<T>) {
    return applyDecorators ( 
        ApiOperation ({
            summary: 'Deletes a collaborator by its ID',
            description: 'Delete a collaborator by its ID'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'Collaborator ID'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound()
    )
}