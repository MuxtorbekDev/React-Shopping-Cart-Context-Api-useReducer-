import React from "react";
import {
  Navbar,
  Container,
  FormControl,
  Nav,
  Badge,
  Dropdown,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <>
      <Navbar
        style={{
          height: 80,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
        bg="dark"
        variant="dark"
      >
        <Container>
          <Nav>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <FaShoppingCart color="white" fontSize="25px" />
                <Badge>{cart.length}</Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ minWidth: 370 }}>
                {cart.length > 0 ? (
                  <div>
                    {cart.map((p) => (
                      <div key={p.id}>
                        <span className="cartItem">
                          <img
                            src={p.image}
                            className="cartItemImg"
                            alt={p.name}
                          />
                          <div className="cartItemDetail">
                            <span>{p.name}</span>
                            <span>$ {p.price.split(".")[0]}</span>
                          </div>
                          <AiFillDelete
                            fontSize="20px"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: p,
                              });
                            }}
                          />
                        </span>
                      </div>
                    ))}
                    <Link to="/cart">
                      <Button
                        style={{ width: "95%", margin: "0 10px" }}
                        variant="success"
                      >
                        Go To Cart
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <span>Cart is Empty</span>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          <Navbar.Text className="search">
            <FormControl
              style={{ width: 500 }}
              placeholder="Serach a praduct..."
              className="m-auto"
              onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </Navbar.Text>
          <Navbar.Brand>
            <Link to="/">Shopping Card</Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
