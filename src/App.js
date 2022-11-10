import { createContext, useEffect, useState } from "react";
import { Button, Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import "./App.css";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";
import axios from "axios";
import Cart from "./routes/Cart.js";
import { useQuery } from "react-query";

export let Context1 = createContext();

function App() {
  // let obj = { name: "kim" };
  // localStorage.setItem("data", JSON.stringify(obj));
  // let 꺼낸거 = localStorage.getItem("data");
  // 꺼낸거 = JSON.parse(꺼낸거);
  // console.log(꺼낸거.name);

  useEffect(() => {
    let 꺼낸거 = localStorage.getItem("watched");
    꺼낸거 = JSON.parse(꺼낸거);
    Array.isArray(꺼낸거) == false
      ? localStorage.setItem("watched", JSON.stringify([]))
      : console.log("");
  }, []);

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

  let result = useQuery("작명", () =>
    axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
      console.log("요청됨");
      return a.data;
    })
  );

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
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading && "로딩중"}
            {result.error && "에러남"}
            {result.data && result.data.name}
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
        <Route path="/cart" element={<Cart />}></Route>
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
