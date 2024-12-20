import { ApiProperty } from '@nestjs/swagger';
import { EstatusTodo } from 'src/enums/TodoEnum';
import { CTodos } from 'src/shared/entities';
import { ApiResponseDTO } from './Common-ResponsesDTO';
import { PaginacionResponseDTO } from './PaginacionDTO';

export class TodoResponseDto {
  @ApiProperty({
    description: 'ID del todo',
    example: 1,
  })
  todoId: number;

  @ApiProperty({
    description: 'Título del todo',
    example: 'Comprar leche',
  })
  todoTitulo: string;

  @ApiProperty({
    description: 'Descripción detallada del todo',
    example: 'Ir al supermercado y comprar leche',
  })
  todoDescripcion: string;

  @ApiProperty({
    description: 'Indica si el todo está activo o no',
    example: true,
  })
  registroActivo: boolean;

  @ApiProperty({
    description: 'Fecha de creación del todo',
    example: '2024-12-19T10:00:00.000Z',
  })
  todoFechaCreacion: Date;

  @ApiProperty({
    description: 'Fecha de última actualización del todo',
    example: '2024-12-19T10:00:00.000Z',
  })
  todoFechaActualizacion: Date;

  @ApiProperty({
    description: 'Fecha de eliminación del todo (si se aplica)',
    example: null,
  })
  todoFechaEliminacion: Date | null;

  @ApiProperty({
    description: 'Estado actual del todo (Por Hacer, En Progreso, Finalizada)',
    example: EstatusTodo.POR_HACER,
    enum: EstatusTodo,
  })
  estatus: EstatusTodo;

  constructor(todo: CTodos) {
    this.todoId = todo.todoId;
    this.todoTitulo = todo.todoTitulo;
    this.todoDescripcion = todo.todoDescripcion
    this.registroActivo = todo.registroActivo;
    this.estatus = todo.estatus;
;
  }
}


export class CreateTodoResponseDto extends ApiResponseDTO<TodoResponseDto> {
    @ApiProperty({
      type: TodoResponseDto,
    })
    data: TodoResponseDto;
  
    @ApiProperty({
      example: 201,
    })
    statusCode: number;
  }
  
  export class TodoOneResponseDto extends ApiResponseDTO<TodoResponseDto> {
    @ApiProperty({
      type: TodoResponseDto,
      description: 'Respuesta del TODO por su id',
    })
    data: TodoResponseDto;
  }
  
  export class UpdateTodoResponseDto extends ApiResponseDTO<TodoResponseDto> {
    @ApiProperty({
      type: TodoResponseDto,
    })
    data: TodoResponseDto;
  }
  
  export class DeleteTodoResponseDto extends ApiResponseDTO<any> {
    @ApiProperty({
      description: 'Confirmación de eliminación del TODO',
      example: null,
    })
    data: any;
  }


  export class TodosListResponseDto extends ApiResponseDTO<
  TodoResponseDto[]
> {
  constructor(
    rooms: TodoResponseDto[],
    pagination: PaginacionResponseDTO,
  ) {
    super();
    this.data = rooms;
    this.pagination = pagination;
  }

  @ApiProperty({
    type: [TodoResponseDto],
    description: 'Respuesta de listado de todos los TODOS',
  })
  data: TodoResponseDto[];

  @ApiProperty({
    type: PaginacionResponseDTO,
    description: 'Información de paginación',
  })
  pagination: PaginacionResponseDTO;
}
