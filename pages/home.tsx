import SEO from "components/seo";
import FooterMenu from "containers/footerMenu/footerMenu";
import { useAppSelector } from "hooks/useRedux";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { selectUserCart } from "redux/slices/userCart";

import informationService from "services/information";
import createSettings from "utils/createSettings";

const uiTypes = {
  "1": dynamic(() => import("containers/homev1/homev1")),
  "4": dynamic(() => import("containers/homev4/homev4")),
  "2": dynamic(() => import("containers/homev2/homev2")),
  "3": dynamic(() => import("containers/homev3/homev3")),
};

type HomeProps = {
  uiType?: keyof typeof uiTypes;
};

export default function Home({ uiType = "1" }: HomeProps) {
  const Ui = uiTypes[uiType];
  const Homev1 = uiTypes["1"];


  const cart = useAppSelector(selectUserCart);
    // const cartIndicatorVisible = useAppSelector(state => state.userCart.indicatorVisible)
    // const cartItems = cart?.user_carts.flatMap((item) => item.cartDetails) || [];

  
    console.log("cart",cart.user_carts.length);

  return (
    <>
      <SEO />
      {!!Ui ? <Ui /> : <Homev1 />}
      <FooterMenu />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const settingsData = await informationService.getSettings();
  const obj = createSettings(settingsData?.data);

  return {
    props: {
      uiType: process.env.NEXT_PUBLIC_UI_TYPE || obj?.ui_type,
    },
  };
};
