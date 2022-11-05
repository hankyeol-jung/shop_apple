import { useState } from "react";
import { Button, Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import "./App.css";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";
import axios from "axios";

function App() {
  let [shoes, setShoes] = useState(data);
  let [num, setNum] = useState(0);
  let navigate = useNavigate();

  let clickGet = () => {
    if (num == 0) {
      axios
        .get("https://codingapple1.github.io/shop/data2.json")
        .then((result) => {
          let copy = [...shoes, ...result.data];
          setShoes(copy);
        })
        .catch(() => {
          console.log("실패");
        });
    } else if (num == 1) {
      axios
        .get("https://codingapple1.github.io/shop/data3.json")
        .then((result) => {
          let copy = [...shoes, ...result.data];
          setShoes(copy);
        })
        .catch(() => {
          console.log("실패");
        });
    }
  };

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail/0");
              }}
            >
              Detail
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>

              <Button
                onClick={() => {
                  let copy = [...shoes];
                  copy = copy.sort((x, y) => x.title.localeCompare(y.title));
                  setShoes(copy);
                }}
                variant="outline-secondary"
              >
                정렬
              </Button>

              <Container>
                <Row>
                  {shoes.map((a, i) => {
                    return (
                      <Card shoes={shoes[i]} i={i} navigate={navigate}></Card>
                    );
                  })}
                </Row>
              </Container>
              {num <= 1 ? (
                <button
                  onClick={() => {
                    setNum(num + 1);
                    clickGet();
                  }}
                >
                  버튼
                </button>
              ) : null}
            </>
          }
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="*" element={<div>없는페이지요</div>} />
      </Routes>
    </div>
  );
}

function Card(props) {
  return (
    <Col
      md={4}
      onClick={() => {
        props.navigate("/detail/" + props.i);
      }}
    >
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" +
          (props.shoes.id + 1) +
          ".jpg"
        }
        width={"80%"}
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </Col>
  );
}

export default App;
