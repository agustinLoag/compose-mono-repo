import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { ApiProperty } from '@nestjs/swagger';
import { EstatusTodo } from 'src/enums/TodoEnum';
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({
    description: 'Título del todo',
    example: 'Comprar leche',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsNotEmpty()
  todoTitulo: string;

  @ApiProperty({
    description: 'Descripción detallada del todo',
    example: 'Ir al supermercado y comprar leche',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(250)
  @IsNotEmpty()
  todoDescripcion: string;

  @ApiProperty({
    description: 'Estado actual del todo (Por Hacer, En Progreso, Finalizada)',
    example: EstatusTodo.POR_HACER,
    enum: EstatusTodo,
  })
  @IsEnum(EstatusTodo)
  @IsNotEmpty()
  estatus: EstatusTodo;
}
