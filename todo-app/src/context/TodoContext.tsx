import React, { createContext, useState } from "react";
import {
  IContextTodo,
  IFormValues,
  ITodoProviderProps,
} from "../interfaces/TodoContext.interface";
import { Form } from "antd";
import { todoServices } from "../services/TodoServices";
import { IDataTodo } from "../interfaces/TodoServices.interface";

export const TodoContext = createContext<IContextTodo>({} as IContextTodo);

export const TodoProvider: React.FC<ITodoProviderProps> = ({ children }) => {
  const [formLogin] = Form.useForm();
  const [todosData, setTodosData] = useState<IDataTodo[] | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentSelectedItem, setCurrentSelectedItem] = useState<IDataTodo>(
    {} as IDataTodo
  );
  const dataStatus = [
    {
      label: "Por Hacer",
      value: "Por Hacer",
    },
    {
      label: "En Progreso",
      value: "En Progreso",
    },
    {
      label: "Finalizada",
      value: "Finalizada",
    },
  ];

  const handleSubmit = (values: IFormValues) => {
    console.log("Form values:", values);
  };

  const fetchTodos = async () => {
    try {
      const response = await todoServices.getAllTodos({
        pagina: 1,
        limite: 10,
      });
      if (response) {
        setTodosData(response.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleSubmitTodo = async (values: IFormValues) => {
    try {
      if (isEditing) {
        await todoServices.updateTodo(currentSelectedItem.todoId, values);
      } else {
        await todoServices.postAddTodo(values);
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (isEditing) {
        setIsEditing(false);
      }
      formLogin.resetFields();
      setCurrentSelectedItem({} as IDataTodo);
      fetchTodos();
    }
  };

  const handleUpdateTodo = (item: IDataTodo) => {
    console.log(item, "ITEM");
    setCurrentSelectedItem(item);
    setIsEditing(true);
    formLogin.setFieldsValue(item);
  };

  const handleDelete = async (item: IDataTodo) => {
    try {
      const response = await todoServices.deleteTodo(item?.todoId);
      console.log(response, "Response");
    } catch (error) {
      console.log(error);
    } finally {
      fetchTodos();
    }
  };

  const valuesProvider = {
    formLogin,
    dataStatus,
    todosData,
    handleSubmit,
    fetchTodos,
    handleSubmitTodo,
    handleUpdateTodo,
    handleDelete,
  };
  return (
    <TodoContext.Provider value={valuesProvider}>
      {children}
    </TodoContext.Provider>
  );
};
