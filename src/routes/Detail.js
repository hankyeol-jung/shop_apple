import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";

function Detail(props) {
  let [pop, setPop] = useState(true);
  let [count, setCount] = useState(0);
  let { id, setId } = useParams();
  let [num, setNum] = useState("");
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFade2("end");
    }, 100);
    return () => {
      setFade2("");
    };
  }, []);

  useEffect(() => {
    let a = setTimeout(() => {
      setPop(false);
    }, 2000);
    if (isNaN(num) == true) {
      alert("그러지마세요");
    }
  }, [num]);

  let findPro = props.shoes.find(function (x) {
    return x.id == id;
  });
  return (
    <div className={"container start " + fade2}>
      {pop == true ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (props.shoes[id].id + 1) +
              ".jpg"
            }
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            onChange={(e) => {
              setNum(e.target.value);
            }}
          />
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
}

function TabContent({ tab }) {
  let [fade, setFade] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, [tab]);

  return (
    <div className={"start " + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
}

export default Detail;
