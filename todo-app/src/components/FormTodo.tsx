import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { EstatusTodo, generateBasicInputRules } from "../validations/todoForm";

export const FormTodo = () => {
  const { formLogin, dataStatus, handleSubmitTodo } = useContext(TodoContext);

  return (
    <Form
      layout="vertical"
      form={formLogin}
      style={{ width: 500 }}
      onFinish={handleSubmitTodo}  
    >
      <Form.Item
        name="todoTitulo"
        label="Nombre de estudio de imagen"
        rules={[
          ...generateBasicInputRules(50, true),
          {
            min: 2,
            message: "Debe tener al menos 2 caracteres",
          },
        ]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        name="todoDescripcion"
        label="Nombre de estudio de imagen"
        rules={[
          ...generateBasicInputRules(250, true),
          {
            min: 5,
            message: "Debe tener al menos 5 caracteres",
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="estatus"
        label="Categoría de estudio de imagen"
        rules={[
          ...generateBasicInputRules(50, true),
          {
            type: 'enum',
            enum: Object.values(EstatusTodo),
            message: `El estado debe ser uno de los siguientes: ${Object.values(EstatusTodo).join(', ')}`
          }
        ]}
      >
        <Select
          showSearch
          placeholder="Seleccione un estatus"
          popupMatchSelectWidth={false}
          options={dataStatus}
          filterOption={(input, option) => {
            if (!option || !option.label) return false;
            const label = String(option.label);
            return label.toLowerCase().includes(input.toLowerCase());
          }}
          notFoundContent="Sin resultados"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};
