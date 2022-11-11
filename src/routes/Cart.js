import React, { memo, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "./../store/userSlice.js";
import { addCount } from "./../store.js";

let Child = memo(function () {
  console.log("재렌더링됨");
  return <div>자식임</div>;
});

// function 함수(){
//   return 반복문 10억번 돌린결과
// }

function Cart() {
  // let result = useMemo(()=>{return 함수()},[state])
  let state = useSelector((state) => state);
  let [fade, setFade] = useState("");
  let dispatch = useDispatch();
  let [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, []);
  return (
    <div className={"start " + fade}>
      <Child count={count}></Child>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      {state.user.name}
      {state.user.age}의 장바구니
      <button
        onClick={() => {
          dispatch(increase());
        }}
      >
        버튼
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => (
            <tr key={i}>
              <td>{state.cart[i].id}</td>
              <td>{state.cart[i].name}</td>
              <td>{state.cart[i].count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(addCount(state.cart[i].id));
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
