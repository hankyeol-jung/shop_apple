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
        <Row>
          {shoes.map((a, i) => {
            return <Card shoes={shoes[i]} i={i}></Card>;
          })}
        </Row>
      </Container>
    </div>
  );
}
function Card(props) {
  return (
    <Col md={4}>
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width={"80%"}
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </Col>
  );
}

export default App;
