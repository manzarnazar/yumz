import React, { useEffect, useState } from "react";
import cls from "./cart.module.scss";
import CartHeader from "components/cartHeader/cartHeader";
import CartProduct from "components/cartProduct/cartProduct";
import CartServices from "components/cartServices/cartServices";
import CartTotal from "components/cartTotal/cartTotal";
import { useAppSelector } from "hooks/useRedux";
import { selectCart, selectTotalPrice } from "redux/slices/cart";
import EmptyCart from "components/emptyCart/emptyCart";
import { IShop } from "interfaces";
import { useSettings } from "contexts/settings/settings.context";
import { selectUserCart } from "redux/slices/userCart";

type Props = {
  shop: IShop;
};

export default function Cart({ shop }: Props) {
  const cartItems = useAppSelector(selectCart);
  const totalPrice = useAppSelector(selectTotalPrice);
  const { address } = useSettings(); // Access the address from the context
  const [price, setPrice] = useState('');
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const cart = useAppSelector(selectUserCart);

  console.log(cartItems);
  console.log("shop",shop);
  

  
  useEffect(() => {
    if (address) {
      const add = address.split(",");
      if (add.length > 1) {
        const filtered = add[add.length - 2]?.trim();
        const extract = filtered?.split(" ");
        const cityExtracted = extract?.length === 1 ? extract[0] : extract?.[1];
  
        // Use shopDeliveryZipcode
        const matchingCity = shop?.shop_delivery_zipcodes?.find(
          (item) => item.city.toLowerCase() === cityExtracted?.toLowerCase()
        );
  
        // console.log("take",matchingCity);
  
        if (matchingCity) {
          setDeliveryPrice(Number(matchingCity.delivery_price || 0)); // Ensure it's a number
        } else {
          setDeliveryPrice(0); // Default if no matching city
        }
        // setPrice(cityExtracted  0);
      }
    }
  }, [address, shop?.shop_delivery_zipcodes]);
    
    


  
console.log("cart",cart);

  return (
    <div className={cls.wrapper}>
      <div className={cls.body}>
        <CartHeader />
        {cartItems.map((item) => (
          <CartProduct key={item.stock.id} data={item} />
        ))}
        {cartItems.length < 1 && (
          <div className={cls.empty}>
            <EmptyCart />
          </div>
        )}
      </div>
      {cartItems.length > 0 && <CartServices data={shop} />}
      {cartItems.length > 0 && (
        <CartTotal totalPrice={totalPrice+deliveryPrice+ Number(shop.serviceFee)} data={shop} />
      )}
    </div>
  );
}
