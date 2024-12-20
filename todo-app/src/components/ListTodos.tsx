import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { Col, Flex, Row, Typography } from "antd";
import { CardItem } from "./Card";

export const ListTodos: React.FC = () => {
  const { todosData } = useContext(TodoContext);
  return (
    <Row gutter={[16, 16]}>
      {todosData && todosData.length > 0 ? (
        todosData.map((item, idx) => (
          <Col xs={24} sm={12} md={12} key={idx}>
            <CardItem currentItem={item} />
          </Col>
        ))
      ) : (
        <Flex align="center" style={{height: '100vh'}}>
          <Typography.Title level={2}>Vamos!!! Agrega tu nuevo TODO</Typography.Title>
        </Flex>
      )}
    </Row>
  );
};
