import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeProductFromCart,
  updateProductQuantityFromCart,
} from "../features/users/userSlice";

const Cart = () => {
  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  const [totalAmount, setTotalAmount] = useState(null);
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const dispatch = useDispatch();
  const userCartState = useSelector((state) => state.auth.cartProducts);

  const deleteACartProduct = (id) => {
    dispatch(removeProductFromCart({ id: id, config2: config2 }));
    setTimeout(() => {
      dispatch(getCart(config2));
    }, 200);
  };

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateProductQuantityFromCart({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getCart(config2));
      }, 200);
    }
  }, [productUpdateDetail]);

  useEffect(() => {
    dispatch(getCart(config2));
  }, []);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState.length; index++) {
      sum =
        sum +
        Number(userCartState[index].quantity) * userCartState[index].price;
      setTotalAmount(sum);
    }
  }, [userCartState]);

  return (
    <>
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header p-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {userCartState &&
              userCartState.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                  >
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-25">
                        <img src={watch} alt="watch" className="img-fluid" />
                      </div>
                      <div className="w-75">
                        <p>{item?.productId.title}</p>

                        <p className="d-flex gap-3">
                          Color:{" "}
                          <ul className="colors ps-0">
                            <li
                              style={{ backgroundColor: item?.color.title }}
                            ></li>
                          </ul>
                        </p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">$ {item?.price}</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          name={"quantity" + item?._id}
                          id={"cart" + item?._id}
                          min={1}
                          max={10}
                          value={item?.quantity}
                          onChange={(e) => {
                            setProductUpdateDetail({
                              cartItemId: item?._id,
                              quantity: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <AiFillDelete
                          onClick={() => {
                            deleteACartProduct(item?._id);
                          }}
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">
                        $ {item?.price * item?.quantity}
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue Shopping
              </Link>
              {(totalAmount !== null || totalAmount !== 0) && (
                <div className="d-flex flex-column align-items-end">
                  <h5>Subtotal: ${totalAmount}</h5>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
