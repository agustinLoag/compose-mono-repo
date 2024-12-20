import { Col, Flex, Row } from "antd";
import { useContext, useEffect } from "react";
import { FormTodo } from "./components/FormTodo";
import { ListTodos } from "./components/ListTodos";
import { TodoContext } from "./context/TodoContext";

function App() {
  const { fetchTodos } = useContext(TodoContext);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <Row style={{ height: "100vh" }} justify="center">
        <Col md={12}>
          <Flex align="center" style={{ height: "100%" }} justify="center">
            <FormTodo />
          </Flex>
        </Col>
        <Col span={12}>
          <ListTodos />
        </Col>
      </Row>
    </>
  );
}

export default App;
