import React, { useEffect, useState } from "react";
import RunFillIcon from "remixicon-react/RunFillIcon";
import cls from "./cartServices.module.scss";
import { useTranslation } from "react-i18next";
import { IShop } from "interfaces";
import Price from "components/price/price";
import { selectCurrency } from "redux/slices/currency";
import { useAppSelector } from "hooks/useRedux";
import { selectUserCart } from "redux/slices/userCart";
import Badge from "components/badge/badge";
import { useSettings } from "contexts/settings/settings.context"; // Import the context

type Props = {
  data: IShop;
};

export default function CartServices({ data }: Props) {
  const { t } = useTranslation();
  const currency = useAppSelector(selectCurrency);
  const cart = useAppSelector(selectUserCart);
  const { address } = useSettings(); // Access the address from the context
  const [price, setPrice] = useState('');
  const [deliveryPrice, setDeliveryPrice] = useState("");

  useEffect(() => {
    if (address) {
      const add = address.split(",");
      if (add.length > 1) {
        const filtered = add[add.length - 2]?.trim();
        const extract = filtered?.split(" ");
        const cityExtracted = extract?.length === 1 ? extract[0] : extract?.[1];

        const matchingCity = data.shop_delivery_zipcodes.find(
          (item) => item.city.toLowerCase() === cityExtracted?.toLowerCase()
        );
        console.log(matchingCity);
        
        // console.log(data?.shop_delivery_zipcodes); set price baased on the zipcode this contains array of object 0
        if (matchingCity) {
          setDeliveryPrice(matchingCity.delivery_price);
        } else {
          setDeliveryPrice(""); // Default if no matching city
        }
        setPrice(cityExtracted || "");
      }
    }
  },  [address, data?.shop_delivery_zipcodes]);
  
console.log("deliveryPrice",deliveryPrice);

  return (
    <div className={cls.wrapper}>
      <div className={cls.flex}>
        <div className={cls.item}>
          <div className={cls.icon}>
            <span className={cls.greenDot} />
            <RunFillIcon />
          </div>
          <div className={cls.row}>
            <h5 className={cls.title}>{t("delivery.price")}</h5>
            <p className={cls.text}>{t("start.price")}</p>
          </div>
        </div>
        <div className={cls.price}>
          <Price number={parseFloat(deliveryPrice || "0")} />
        </div>
      </div>

      {!!cart.receipt_discount && (
        <div className={cls.flex}>
          <div className={cls.item}>
            <Badge type="discount" variant="circle" />
            <span></span>
            <div className={cls.row}>
              <h5 className={cls.title}>{t("discount")}</h5>
              <p className={cls.text}>{t("recipe.discount.definition")}</p>
            </div>
          </div>
          <div className={cls.price}>
            <Price number={cart.receipt_discount} minus />
          </div>
        </div>
      )}
    </div>
  );
}