import { IFormValues } from "./TodoContext.interface";

export interface ITodoServices {
  getAllTodos(queryParams: ITodoParams): Promise<IResponseAPIGetAll<IDataTodo[]> | undefined>;
  getTodoDetail(idTodo: number): Promise<unknown>;
  postAddTodo(body: IFormValues): Promise<IResponseAPIGetAll<IDataTodo> | undefined>;
  deleteTodo(idTodo: number): Promise<IResponseAPIGetAll<null> | undefined>;
  updateTodo(idTodo: number, body: IFormValues): Promise<IResponseAPIGetAll<IDataTodo> | undefined>;
}

export interface ITodoParams {
  todoId?: number;
  todoTitulo?: string;
  todoDescripcion?: string;
  limite?: number;
  pagina?: number;
}

export interface IResponseAPIGetAll<T> {
  data: T;
  description: string;
  statusCode: number;
  statusText: string;
  pagination?: Pagination;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  offset: number;
}

export interface IDataTodo {
  todoId: number;
  todoTitulo: string;
  todoDescripcion: string;
  registroActivo: boolean;
  estatus: string;
}


export type PartialDataTodo = Partial<IDataTodo>;