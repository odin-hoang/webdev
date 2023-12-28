"use client";
import Image from "next/image";
import nike from "@/app/assets/nike.png";
import trash from "@/app/assets/trash.png";
import check from "@/app/assets/check.png";

import axios from "axios";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "@/features/cart-slice.ts";

export default function Home() {
  const [shoes, setShoes] = useState([]);
  useEffect(() => {
    // const apiUrl =
    //   process.env.NODE_ENV === "development"
    //     ? process.env.SERVER_API_URL_DEV
    //     : process.env.SERVER_API_URL_PROD;
    // axios.defaults.baseURL = apiUrl;
    // console.log(apiUrl);
    axios
      .get("https://webdev-php-production.up.railway.app/api/products")
      .then((products) => {
        // console.log(products.data.shoes);
        setShoes(products.data.shoes);
      });
  }, []);
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const handleAddToCart = (payload) => {
    const cartItem = {
      id: payload.id,
      image: payload.image,
      name: payload.name,
      description: payload.description,
      color: payload.color,
      price: payload.price,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
  };
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  const handleIncrement = (index) => {
    const updatedQuantity = cart[index].quantity + 1;
    dispatch(updateCartItemQuantity({ index, quantity: updatedQuantity }));
  };
  const handleDecrement = (index, id) => {
    const updatedQuantity = cart[index].quantity - 1;
    dispatch(updateCartItemQuantity({ index, quantity: updatedQuantity }));
    if (updatedQuantity === 0) dispatch(removeFromCart(id));
  };
  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <main className="app-wrapper z-10">
      <div className="app-card">
        <div className="app-card-top">
          <Image
            className=" block"
            width={50}
            height={50}
            alt="Logo"
            src={nike}
          ></Image>
        </div>
        <div className="app-card-title">Our Products</div>
        <div className="app-card-body">
          {shoes.map((shoe) => (
            <div className="app-shop-item" key={shoe.id}>
              <div
                className="app-shop-item-image"
                style={{ backgroundColor: shoe.color }}
              >
                <img src={shoe.image}></img>
              </div>
              <div className="app-shop-item-name">{shoe.name}</div>
              <div className="app-shop-item-description">
                {shoe.description}
              </div>
              <div className="app-shop-item-bottom">
                <div className="app-shop-item-price">
                  ${shoe.price.toFixed(2)}
                </div>
                {cart
                  .filter((item) => shoes.some((shoe) => shoe.id === item.id))
                  .map((item) => item.id)
                  .includes(shoe.id) ? (
                  <div
                    className="app-shop-item-button app-shop-item-button-inactive"
                    onClick={() => handleAddToCart(shoe)}
                  >
                    <Image
                      src={check}
                      width={40}
                      height={40}
                      alt="check"
                      className="scale-[3]"
                    />
                  </div>
                ) : (
                  <div
                    className="app-shop-item-button"
                    onClick={() => handleAddToCart(shoe)}
                  >
                    ADD TO CART
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="app-card">
        <div className="app-card-top">
          <Image
            className=" block"
            width={50}
            height={50}
            alt="Logo"
            src={nike}
          ></Image>
        </div>
        <div className="app-card-title">
          Your cart
          <span className="app-card-title-amount">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="app-card-body">
          <div>
            {cart.length === 0 && (
              <p className="font-thin text-sm mt-5">Your cart is empty.</p>
            )}
            {cart.map((item, index) => (
              <div className="app-cart-item" key={index}>
                <div className="app-cart-item-left">
                  <div
                    className="app-cart-item-image"
                    style={{ backgroundColor: item.color }}
                  >
                    <div className="app-cart-item-block">
                      <img src={item.image} />
                    </div>
                  </div>
                </div>
                <div className="app-cart-item-right">
                  <div className="app-cart-item-name">{item.name}</div>
                  <div className="app-cart-item-price">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="app-cart-item-action">
                    <div className="app-cart-item-count">
                      <div
                        className="app-cart-item-button"
                        onClick={() => handleDecrement(index, item.id)}
                      >
                        -
                      </div>
                      <div className="app-cart-item-number">
                        {item.quantity}
                      </div>
                      <div
                        className="app-cart-item-button"
                        onClick={() => handleIncrement(index)}
                      >
                        +
                      </div>
                    </div>
                    <div
                      className="app-cart-item-remove"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <Image width={16} height={16} alt="remove" src={trash} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
