import axios from "axios";
import {
  IDataTodo,
  IResponseAPIGetAll,
  ITodoParams,
  ITodoServices,
} from "../interfaces/TodoServices.interface";
import { baseURL } from "../constants/ServicesConstants";
import { IFormValues } from "../interfaces/TodoContext.interface";

export const todoServices: ITodoServices = {
  getAllTodos: async function (queryParams: ITodoParams) {
    const { pagina, limite, todoDescripcion, todoId, todoTitulo } = queryParams;
    try {
      const { data } = await axios.get<IResponseAPIGetAll<IDataTodo[]>>(
        `${baseURL}/todo`,
        {
          params: {
            pagina: pagina || undefined,
            limite: limite || undefined,
            todoDescripcion: todoDescripcion || undefined,
            todoId: todoId || undefined,
            todoTitulo: todoTitulo || undefined,
          },
        }
      );

      if (!data || data.data.length === 0) {
        throw new Error("No data found");
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getTodoDetail: async function (idTodo: number) {
    return await console.log("Este es el todo", idTodo);
  },
  postAddTodo: async function (body: IFormValues) {
    try {
      const response = await axios.post<IResponseAPIGetAll<IDataTodo>>(
        `${baseURL}/todo`,
        body
      );
      return response.data
    } catch (error) {
      console.log(error);
    }
  },
  deleteTodo: async function (idTodo: number) {
    try {
      const { data } = await axios.delete<IResponseAPIGetAll<null>>(
        `${baseURL}/todo/${idTodo}`,
      );
      console.log(data, "DATA")
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  updateTodo: async function (idTodo: number, body) {
    
    try {
      const {data } = await axios.patch<IResponseAPIGetAll<IDataTodo>>(
        `${baseURL}/todo/${idTodo}`,
        body
      );
      return data
    } catch (error) {
      console.log(error);
    }
    
  },
};
