"use client";
import Image from "next/image";
import nike from "@/app/assets/nike.png";
import trash from "@/app/assets/trash.png";
import axios from "axios";

import { useEffect, useState } from "react";
const cart = [
  {
    id: 1,
    image:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/air-zoom-pegasus-36-mens-running-shoe-wide-D24Mcz-removebg-preview.png",
    name: "Nike Air Zoom Pegasus 36",
    description:
      "The iconic Nike Air Zoom Pegasus 36 offers more cooling and mesh that targets breathability across high-heat areas. A slimmer heel collar and tongue reduce bulk, while exposed cables give you a snug fit at higher speeds.",
    price: 108.97,
    color: "#e1e7ed",
  },
  {
    id: 2,
    image:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/air-zoom-pegasus-36-shield-mens-running-shoe-24FBGb__1_-removebg-preview.png",
    name: "Nike Air Zoom Pegasus 36 Shield",
    description:
      "The Nike Air Zoom Pegasus 36 Shield gets updated to conquer wet routes. A water-repellent upper combines with an outsole that helps create grip on wet surfaces, letting you run in confidence despite the weather.",
    price: 89.97,
    color: "#4D317F",
  },
];

export default function Home() {
  const [shoes, setShoes] = useState([]);
  useEffect(() => {
    // const apiUrl =
    //   process.env.NODE_ENV === "development"
    //     ? process.env.SERVER_API_URL_DEV
    //     : process.env.SERVER_API_URL_PROD;
    // axios.defaults.baseURL = apiUrl;
    // console.log(apiUrl);
    axios.get("http://127.0.0.1:8000/api/products").then((products) => {
      console.log(products.data.shoes);
      setShoes(products.data.shoes);
    });
  }, []);
  return (
    <main className="app-wrapper">
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
                <div className="app-shop-item-button">ADD TO CART</div>
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
          <span className="app-card-title-amount"></span>
          <div className="app-card-body">
            <div>
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
                        <div className="app-cart-item-button">-</div>
                        <div className="app-cart-item-number">1</div>
                        <div className="app-cart-item-button">+</div>
                      </div>
                      <div className="app-cart-item-remove">
                        <Image
                          width={16}
                          height={16}
                          alt="remove"
                          src={trash}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
