import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiParam } from "@nestjs/swagger";
import { NotFoundResponseDTO, InternalServerErrorResponseDTO, BadRequestResponseDTO, ConflictResponseDTO } from "src/shared/dtos/Common-ResponsesDTO";
import { CreateTodoResponseDto, DeleteTodoResponseDto, TodoResponseDto, TodosListResponseDto, UpdateTodoResponseDto } from "src/shared/dtos/TodoResponse";

export const create = () => {
    return applyDecorators(
      ApiOperation({
        summary: 'Crear un nueva TODO',
        description:
          'Este endpoint permite la creación de un nueva TODO en el sistema. Se espera recibir un objeto JSON con la información necesaria para registrar la TODO. Si la solicitud es exitosa, el servidor responderá con la información de la TODO creada y un código de estado 201 (Creado).',
      }),
      ApiResponse({
        status: 201,
        description: 'Operación exitosa',
        type: CreateTodoResponseDto,
      }),
      ApiResponse({
        status: 400,
        description: 'Petición mal formada',
        type: BadRequestResponseDTO,
      }),
      ApiResponse({
        status: 409,
        description: 'Conflicto en la creación',
        type: ConflictResponseDTO,
      }),
      ApiResponse({
        status: 500,
        description: 'Error interno del servidor',
        type: InternalServerErrorResponseDTO,
      }),
    );
  };

export const findAll = () => {
    return applyDecorators(
      ApiOperation({
        summary: 'Obtener todos los registros de TODOs',
        description:
          'Este endpoint permite obtener todos los registros de TODOs disponibles con paginación opcional.',
      }),
      ApiQuery({
        name: 'todoId',
        description: 'ID de TODO',
        type: String,
        example: 1,
        required: false,
      }),
      ApiQuery({
        name: 'todoTitulo',
        description: 'Titulo del TODO',
        type: String,
        example: "Comprar leche",
        required: false,
      }),
      ApiQuery({
        name: 'todoDescripcion',
        description: 'Ir al supermercado',
        type: String,
        example: "Comprar leche",
        required: false,
      }),
  
      ApiQuery({
        name: 'pagina',
        description: 'Número de páginas a consultar',
        type: Number,
        example: 1,
        required: false,
      }),
      ApiQuery({
        name: 'limite',
        description: 'Límite de resultados por página',
        type: Number,
        example: 4,
        required: false,
      }),
      ApiResponse({
        status: 200,
        description: 'Operación exitosa',
        type: TodosListResponseDto,
      }),
      ApiResponse({
        status: 404,
        description: 'No se encontraron registros',
        type: NotFoundResponseDTO,
      }),
      ApiResponse({
        status: 500,
        description: 'Error interno del servidor',
        type: InternalServerErrorResponseDTO,
      }),
    );
  };
  
  export const findOne = () => {
    return applyDecorators(
      ApiOperation({
        summary: 'Buscar TODO por ID',
        description:
          'Este endpoint permite obtener la información de un TODO hospitalaria registrada en el sistema mediante su ID. Se espera recibir un parámetro de ruta(TODOId)) que representa el ID de la sala.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID de la TODO',
        type: Number,
        example: 5,
        required: true,
      }),
      ApiResponse({
        status: 200,
        description: 'Operación exitosa',
        type: TodoResponseDto,
      }),
      ApiResponse({
        status: 404,
        description: 'No se encontraron registros',
        type: NotFoundResponseDTO,
      }),
      ApiResponse({
        status: 500,
        description: 'Error interno del servidor',
        type: InternalServerErrorResponseDTO,
      }),
    );
  };
  
  export const update = () => {
    return applyDecorators(
      ApiOperation({
        summary: 'Actualizar un TODO existente',
        description:
          'Este endpoint permite actualizar la información de un TODO en el sistema. Se espera recibir el ID de la TODO como un parámetro de ruta y los parámetros de actualización en el cuerpo de la solicitud.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID del TODO',
        type: Number,
        example: 5,
        required: true,
      }),
      ApiResponse({
        status: 200,
        description: 'Operación exitosa',
        type: UpdateTodoResponseDto,
      }),
      ApiResponse({
        status: 400,
        description: 'Petición mal formada',
        type: BadRequestResponseDTO,
      }),
      ApiResponse({
        status: 404,
        description: 'No se encontraron registros',
        type: NotFoundResponseDTO,
      }),
      ApiResponse({
        status: 409,
        description: 'Conflicto en la actualización',
        type: ConflictResponseDTO,
      }),
      ApiResponse({
        status: 500,
        description: 'Error interno del servidor',
        type: InternalServerErrorResponseDTO,
      }),
    );
  };
  
  export const softDelete = () => {
    return applyDecorators(
      ApiOperation({
        summary: 'Eliminar un TODO (soft delete)',
        description:
          'Este endpoint permite eliminar un TODO de manera lógica (soft delete) cambiando su estado a inactivo. No elimina el registro de la base de datos.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID de la TODO',
        type: Number,
        example: 5,
        required: true,
      }),
      ApiResponse({
        status: 200,
        description: 'TODO eliminada con éxito',
        type: DeleteTodoResponseDto,
      }),
      ApiResponse({
        status: 404,
        description: 'No se encontraron registros',
        type: NotFoundResponseDTO,
      }),
      ApiResponse({
        status: 500,
        description: 'Error interno del servidor',
        type: InternalServerErrorResponseDTO,
      }),
    );
  };