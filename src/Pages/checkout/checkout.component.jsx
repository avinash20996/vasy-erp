import React from "react";

import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer,
  TextContainer1,
} from "./checkoutItem.styles";

import "./checkout.styles.scss";
function CheckoutPage({ cartItems, saveCartItems, cartTotal }) {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Products</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Rate</span>
        </div>
        <div className="header-block">
          <span>Subtotal</span>
        </div>
      </div>

      {cartItems.map((cartItem) => (
        <CheckoutItemContainer>
          <ImageContainer>
            <img src={cartItem.imageUrl} alt="item" />
          </ImageContainer>
          <TextContainer>{cartItem.name}</TextContainer>
          <QuantityContainer>
            <span>{cartItem.quantity}</span>
          </QuantityContainer>
          <TextContainer>{cartItem.price}</TextContainer>
          <TextContainer1>{cartItem.subTotal}</TextContainer1>
        </CheckoutItemContainer>
      ))}
      <div className="total">
        <span>Total= ${cartTotal}</span>
      </div>
      <div className="test-warning">
        Please use any data for address and name and email, also use <br />
        card number: 4242 4242 4242 4242, expiry: 02/22, cvv: 123 for dummy
        payment
      </div>
      <div>
        <button className="button-checkout" onClick={() => saveCartItems()}>
          Checkout all items
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
