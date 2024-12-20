import { ApiProperty } from '@nestjs/swagger';

export class PaginacionResponseDTO {
  @ApiProperty({ example: 1, description: 'Número de la página actual' })
  currentPage: number;

  @ApiProperty({ example: 10, description: 'Número total de páginas' })
  totalPages: number;

  @ApiProperty({ example: 100, description: 'Número total de elementos' })
  totalItems: number;

  @ApiProperty({ example: 4, description: 'Número de elementos por página' })
  limit: number;

  @ApiProperty({ example: 0, description: 'Desplazamiento de elementos' })
  offset: number;
}
