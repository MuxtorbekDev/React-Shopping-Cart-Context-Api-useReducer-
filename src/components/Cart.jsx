import React, { useEffect, useState } from "react";
import { ListGroup, Row, Col, Form, Button, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();
  const [num, setNum] = useState(cart.length);

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
    setNum(cart.length);
  }, [cart]);

  let history = useHistory();

  function handleClick() {
    history.push("/");
  }

  return (
    <>
      <div className="home">
        <div className="back">
          <Button onClick={handleClick}>
            <IoIosArrowBack /> Back
          </Button>
        </div>
        <div className="productContainer">
          <ListGroup>
            {cart.map((p) => (
              <ListGroup.Item key={p.id}>
                <Row>
                  <Col md={2}>
                    <Image src={p.image} alt={p.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <span>{p.name}</span>
                  </Col>
                  <Col md={2}>
                    <span>$ {p.price}</span>
                  </Col>
                  <Col md={2}>
                    <Rating rating={p.ratings} />
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={p.qty}
                      onChange={(e) => {
                        dispatch({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            id: p.id,
                            qty: e.target.value,
                          },
                        });
                      }}
                    >
                      {[...Array(p.inStock).keys()].map((x) => (
                        <option key={x} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      varinat="ligiht"
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: p })
                      }
                    >
                      <AiFillDelete fontSize="20px" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="filterContainer2">
          <div className="filters2 summary">
            <span className="title">Subtotle ({num}) items</span>
            <span style={{ fontWeidght: 700, fontSize: 20 }}>
              Total: $ {total}
            </span>
            <Button type="button" disabled={cart.lenght === 0}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
