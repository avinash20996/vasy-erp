import React from "react";
import axios from "axios";
import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer,
} from "./collection-styles.styles";
import "./collection.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import CheckoutPage from "../checkout/checkout.component";

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.saveCartItems = this.saveCartItems.bind(this);
    this.state = {
      page: "collection",
      cartData: [],
      cartTotal: 0,
      items: [
        {
          imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
          price: 25,
          name: "Brown Brim",
          id: 1,
        },
        {
          price: 18,
          imageUrl: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
          id: 2,
          name: "Blue Beanie",
        },
        {
          name: "Brown Cowboy",
          imageUrl: "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
          price: 35,
          id: 3,
        },
        {
          imageUrl: "https://i.ibb.co/RjBLWxB/grey-brim.png",
          price: 25,
          id: 4,
          name: "Grey Brim",
        },
        {
          price: 18,
          id: 5,
          name: "Green Beanie",
          imageUrl: "https://i.ibb.co/YTjW3vF/green-beanie.png",
        },
        {
          price: 14,
          imageUrl: "https://i.ibb.co/rKBDvJX/palm-tree-cap.png",
          name: "Palm Tree Cap",
          id: 6,
        },
        {
          id: 7,
          name: "Red Beanie",
          price: 18,
          imageUrl: "https://i.ibb.co/bLB646Z/red-beanie.png",
        },
        {
          id: 8,
          price: 14,
          imageUrl: "https://i.ibb.co/1f2nWMM/wolf-cap.png",
          name: "Wolf Cap",
        },
        {
          imageUrl: "https://i.ibb.co/X2VJP2W/blue-snapback.png",
          name: "Blue Snapback",
          price: 16,
          id: 9,
        },
      ],
    };
  }

  addItem(item) {
    let itemPresent = false;
    let cart = this.state.cartData;
    let totalamount = 0;
    cart = cart.map((cartItem) => {
      if (cartItem.id == item.id) {
        cartItem.quantity = cartItem.quantity + 1;
        cartItem.subTotal = cartItem.price * cartItem.quantity;
        itemPresent = true;
      }
      return cartItem;
    });
    if (!itemPresent) {
      let newData = { ...item, quantity: 1, subTotal: item.price };
      cart.push(newData);
    }
    let orderTotal = 0;
    cart.map((cartItem) => {
      orderTotal = orderTotal + cartItem.subTotal;
      return cartItem;
    });
    this.setState({ cartData: cart, cartTotal: orderTotal });
  }

  saveCartItems() {
    let paramForApi = {
      order_number: 1,
      order_total_amount: this.state.cartTotal,
      order_items: this.state.cartData,
    };
    axios
      .post("https://janam.free.beeceptor.com/", paramForApi)
      .then((res) => {});
  }

  render() {
    return (
      <div className="shop-page">
        {this.state.page == "collection" ? (
          <div>
            {this.state.cartData?.length ? (
              <span
                title="go to cart"
                onClick={() => this.setState({ page: "cart" })}
                className="go-to-cart"
              >
                <ShoppingIcon
                  width={24}
                  height={24}
                  style={{ right: "3.5rem", cursor: "pointer" }}
                />
                <span className="items-number">
                  {this.state.cartData?.length}
                </span>
              </span>
            ) : null}
            <div className="collection-page">
              <h2 className="title">Shop Items</h2>
              <div className="items">
                {this.state.items.map((item) => (
                  <CollectionItemContainer>
                    <BackgroundImage
                      className="image"
                      imageUrl={item.imageUrl}
                    />
                    <CollectionFooterContainer>
                      <NameContainer>{item.name}</NameContainer>
                      <PriceContainer>{item.price}</PriceContainer>
                    </CollectionFooterContainer>
                    <AddButton onClick={() => this.addItem(item)} inverted>
                      Add to cart
                    </AddButton>
                  </CollectionItemContainer>
                ))}
              </div>
            </div>{" "}
          </div>
        ) : null}
        {this.state.page == "cart" ? (
          <div>
            <CheckoutPage
              cartItems={this.state.cartData}
              saveCartItems={this.saveCartItems}
              cartTotal={this.state.cartTotal}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Shop;
