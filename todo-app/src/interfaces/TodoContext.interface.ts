import { FormInstance } from "antd";
import { ReactNode } from "react";
import { IDataTodo } from "./TodoServices.interface";

export interface ITodoProviderProps {
  children: ReactNode;
}

interface IStatusData {
  label: string;
  value: string;
}

export interface IContextTodo {
  formLogin: FormInstance<IFormValues>;
  dataStatus: IStatusData[];
  handleSubmit: (values: IFormValues) => void;
  fetchTodos: () => Promise<void>;
  setTodosData?: React.Dispatch<React.SetStateAction<IDataTodo[] | null>>;
  todosData: IDataTodo[] | null;
  handleSubmitTodo: (values: IFormValues) => void;
  handleUpdateTodo: (item: IDataTodo) => void;
  handleDelete: (item: IDataTodo) => void;
}

export interface IFormValues {
  todoTitulo: string;
  todoDescripcion: string;
  estatus: string;
}
