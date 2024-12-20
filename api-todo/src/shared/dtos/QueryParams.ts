import {
    IsInt,
    IsOptional,
    IsPositive,
    IsString,
    IsNumber,
    Min,
    IsBoolean,
  } from 'class-validator';
  import { Transform } from 'class-transformer';
  
  export class AllQueryParams {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    pagina?: number = 1;
  
    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    limite?: number = 10;
  
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Transform(({ value }) => parseInt(value, 10))
    id?: number;


    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim())
    todoTitulo?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim())
    todoDescripcion?: string;
  
  
  }
  