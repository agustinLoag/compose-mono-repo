import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Dropdown, Flex, Menu, Popconfirm, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { IDataTodo } from "../interfaces/TodoServices.interface";
import { EstatusTodo } from "../validations/todoForm";

const { Item } = Menu;
interface ICardItemProps {
  currentItem: IDataTodo;
}
export const CardItem: React.FC<ICardItemProps> = ({ currentItem }) => {
  const { handleUpdateTodo, handleDelete } = useContext(TodoContext);

  const menu = (
    <Menu>
      <Item key="1">
        <Popconfirm
          title="Eliminar la tarea"
          description="¿Estás seguro de que deseas eliminar esta tarea?"
          onConfirm={() => handleDelete(currentItem)}
          onOpenChange={() => console.log("open change")}
          okText="Si"
          cancelText="No"
        >
          <DeleteOutlined style={{ marginRight: 8 }} /> Eliminar
        </Popconfirm>
      </Item>
    </Menu>
  );
  const getTagColor = (estatus: string) => {
    switch (estatus) {
      case EstatusTodo.EN_PROGRESO:
        return {
          color: "processing",
          icon: <SyncOutlined />,
        };
      case EstatusTodo.POR_HACER:
        return {
          color: "default",
          icon: <ClockCircleOutlined />,
        };
      case EstatusTodo.FINALIZADA:
        return {
          color: "success",
          icon: <CheckCircleOutlined />,
        };
      default:
        return {
          color: "default",
          icon: <ClockCircleOutlined />,
        };
    }
  };
  return (
    <Card
      title={currentItem?.todoTitulo}
      bordered={false}
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <EditOutlined
          key="edit"
          onClick={() => handleUpdateTodo(currentItem)}
        />,
        <Dropdown overlay={menu} trigger={["click"]} key="ellipsis">
          <EllipsisOutlined />
        </Dropdown>,
      ]}
    >
      <Flex vertical gap={5}>
        <Tag
          style={{ marginBottom: 10 }}
          icon={getTagColor(currentItem?.estatus).icon}
          color={getTagColor(currentItem?.estatus).color}
        >
          {currentItem.estatus}
        </Tag>
        <Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
          }
          title="Usuario-001"
          description={currentItem.todoDescripcion}
        />
      </Flex>
    </Card>
  );
};
