import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDTO<T> {
    @ApiProperty({
      description:
        'Datos devueltos por la API en la respuesta.',
    })
    data: T;
  
    @ApiProperty({
      example: 'Operación exitosa',
      description:
        'Descripción detallada del resultado de la operación realizada por la API.',
    })
    description: string;
  
    @ApiProperty({
      example: 200,
      description:
        'Código de estado HTTP que indica el resultado de la solicitud de éxito.',
    })
    statusCode: number;
  
    @ApiProperty({
      example: 'OK',
      description:
        'Texto asociado con el statusCode, con una breve.',
    })
    statusText: string;
  }

export class CommonResponseDTO {
  @ApiProperty({
    description: 'Descripción de la respuesta',
    example: 'Exitoso',
  })
  description: string;

  @ApiProperty({
    description: 'Código de estado HTTP',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Texto del estado HTTP',
    example: 'Recurso solicitado exitosamente',
  })
  statusText: string;
}

export class BadRequestResponseDTO extends CommonResponseDTO {
  @ApiProperty({
    example: 'El campo registroActivo es requerido',
  })
  description: string;

  @ApiProperty({
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Petición mal formada',
  })
  statusText: string;
}

export class NotFoundResponseDTO extends CommonResponseDTO {
  @ApiProperty({
    example: 'Recurso no encontrado',
  })
  description: string;

  @ApiProperty({
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    example: 'El recurso solicitado no fue encontrado',
  })
  statusText: string;
}

export class InternalServerErrorResponseDTO extends CommonResponseDTO {
  @ApiProperty({
    example: 'Ha ocurrido un error inesperado',
  })
  description: string;

  @ApiProperty({
    example: 500,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Error interno de sistema',
  })
  statusText: string;
}

export class ConflictResponseDTO extends CommonResponseDTO {
  @ApiProperty({
    example: 'Conflicto al consumir servicio',
  })
  description: string;

  @ApiProperty({
    example: 409,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Conflicto',
  })
  statusText: string;
}
