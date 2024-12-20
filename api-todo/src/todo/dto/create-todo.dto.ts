import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { EstatusTodo } from 'src/enums/TodoEnum';

export class CreateTodoDto {
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
