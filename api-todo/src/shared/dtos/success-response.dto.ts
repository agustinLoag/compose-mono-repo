import { PaginacionResponseDTO } from "./PaginacionDTO";


export class SuccessResponse<T> {
    data: T;
    description: string;
    statusCode: number;
    statusText: string;
    pagination?: object;
    constructor(
      data: T,
      description: string,
      statusCode: number,
      statusText: string,
      pagination?: PaginacionResponseDTO,
    ) {
      this.data = data;
      this.description = description;
      this.statusCode = statusCode;
      this.statusText = statusText;
      this.pagination = pagination;
    }
  }
  