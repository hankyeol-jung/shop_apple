import { useState } from "react";
import { Button, Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import "./App.css";
import data from "./data.js";

function App() {
  let [shoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>

      <Container>
        <Modal shoes={shoes}></Modal>
      </Container>
    </div>
  );
}
function Modal(props) {
  return (
    <Row>
      {props.shoes.map(function (a, i) {
        return (
          <Col md={4}>
            <img src={props.shoes[i].img} width={"80%"} />
            <h4>{props.shoes[i].title}</h4>
            <p>{props.shoes[i].price}</p>
          </Col>
        );
      })}
    </Row>
  );
}

export default App;
