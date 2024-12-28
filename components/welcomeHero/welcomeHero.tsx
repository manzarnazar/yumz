import React, { useRef, useState } from "react";
import cls from "./welcomeHero.module.scss";
import useLocale from "hooks/useLocale";
import Search2LineIcon from "remixicon-react/Search2LineIcon";
import PrimaryButton from "components/button/primaryButton";
import { useSettings } from "contexts/settings/settings.context";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import MapPinRangeLineIcon from "remixicon-react/MapPinRangeLineIcon";
import { DEFAULT_LOCATION } from "constants/config";
import { getAddressFromLocation } from "utils/getAddressFromLocation";
import { ILandingPageData, IStatistics } from "interfaces/page.interface";
import roundToHundreds from "utils/roundToHundreds";
import getShorterNumber from "utils/getShorterNumber";

const Map = dynamic(() => import("components/map/map"), { ssr: false });

type Props = {
  data?: ILandingPageData;
  stats?: IStatistics;
};

export default function WelcomeHero({ data, stats }: Props) {
  const { t, locale } = useLocale();
  const inputRef = useRef<any>();
  const { push } = useRouter();
  const { updateAddress, updateLocation } = useSettings();
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const onSubmit = (event?: any) => {
    event.preventDefault();
    if (!location.lat && !location.lng) {
      return;
    }
    updateAddress(inputRef.current?.value);
    updateLocation(`${location.lat},${location.lng}`);
    push("/home");
  };

  const chooseDefaultAddress = async () => {
    if (!navigator.geolocation) {
      alert(t("geolocation.not.supported"));
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
  
        try {
          const address = await getAddressFromLocation(`${latitude},${longitude}`);
          inputRef.current.value = address;
        } catch (error) {
          console.error("Failed to fetch address:", error);
          inputRef.current.value = t("failed.to.get.address");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert(t("failed.to.get.location"));
      }
    );
  };
  

  return (
    <>
      <div
        className={cls.container}
        style={{ backgroundImage: `url(${data?.img})` }}
      >
        <div className="welcome-container">
          <div className={cls.wrapper}>
            <div className={cls.block}>
              <h1 className={cls.title}>{data?.title[locale]}</h1>
              <p className={cls.caption}>{data?.description[locale]}</p>
              <div className={cls.searchBar}>
                <form className={cls.search} onSubmit={onSubmit}>
                  <label htmlFor="search">
                    <Search2LineIcon />
                  </label>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    ref={inputRef}
                    placeholder={t("search")}
                    autoComplete="off"
                  />
                </form>
                <div className={cls.btnWrapper}>
                  <PrimaryButton onClick={onSubmit}>{t("ok")}</PrimaryButton>
                </div>
              </div>
              <div className={cls.actions}>
                <button
                  type="button"
                  className={cls.textButton}
                  onClick={chooseDefaultAddress}
                >
                  <MapPinRangeLineIcon />
                  <span className={cls.text}>
                    {t("choose.recomended.address")}
                  </span>
                </button>
              </div>
              <div className={cls.stats}>
                <div className={cls.item}>
                  <span className={cls.number}>
                    {roundToHundreds(stats?.users)}+
                  </span>
                  <span className={cls.text}>{t("people.trust.us")}</span>
                </div>
                <div className={cls.item}>
                  <span className={cls.number}>
                    {getShorterNumber(roundToHundreds(stats?.orders))}+
                  </span>
                  <span className={cls.text}>
                    {t("delivery.was.successfull")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Map location={location} setLocation={setLocation} inputRef={inputRef} />
    </>
  );
}
