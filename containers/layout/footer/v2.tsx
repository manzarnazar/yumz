/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import cls from "./v2.module.scss";
import { Grid, useMediaQuery } from "@mui/material";
import { BrandLogo, BrandLogoDark } from "components/icons";
import { ThemeContext } from "contexts/theme/theme.context";
import Link from "next/link";
import { META_TITLE } from "constants/config";
import FacebookCircleFillIcon from "remixicon-react/FacebookCircleFillIcon";
import TwitterFillIcon from "remixicon-react/TwitterFillIcon";
import InstagramLineIcon from "remixicon-react/InstagramLineIcon";
import { useSettings } from "contexts/settings/settings.context";
import useLocale from "hooks/useLocale";

type Props = {};

export default function Footer({}: Props) {
  const { t } = useLocale();
  const { isDarkMode } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width:576px)");
  const { settings } = useSettings();
  const isReferralActive = settings.referral_active == 1;

  return (
    <footer className={cls.footer}>
      <div className="container">
        <Grid container spacing={isMobile ? 4 : 6}>
          <Grid item xs={12} md={4}>
            <div className={cls.main}>
              <div className={cls.logoWrapper}>
                {isDarkMode ? <BrandLogoDark /> : <BrandLogo />}
              </div>
              <a href={`tel:${settings?.phone}`} className={cls.phone}>
                {settings?.phone}
              </a>
              <p className={cls.address}>{settings?.address_text}</p>
            </div>
          </Grid>
          <Grid item xs={12} md={2}>
            <ul className={cls.column}>
              <li className={cls.columnItem}>
                <Link href="/home" className={cls.listItem}>
                  {t("home.page")}
                </Link>
              </li>
              <li className={cls.columnItem}>
                <Link href="/about" className={cls.listItem}>
                  {t("about")} {META_TITLE}
                </Link>
              </li>
              {isReferralActive && (
                <li className={cls.columnItem}>
                  <Link href="/referrals" className={cls.listItem}>
                    {t("become.affiliate")}
                  </Link>
                </li>
              )}
              <li className={cls.columnItem}>
                <Link href="/careers" className={cls.listItem}>
                  {t("careers")}
                </Link>
              </li>
              <li className={cls.columnItem}>
                <Link href="/blog" className={cls.listItem}>
                  {t("blog")}
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md={3}>
            <ul className={cls.column}>
              <li className={cls.columnItem}>
                <Link href="/recipes" className={cls.listItem}>
                  {t("recipes")}
                </Link>
              </li>
              <li className={cls.columnItem}>
                <Link href="/help" className={cls.listItem}>
                  {t("get.helps")}
                </Link>
              </li>
              <li className={cls.columnItem}>
                <Link href="/be-seller" className={cls.listItem}>
                  {t("add.your.restaurant")}
                </Link>
              </li>
              <li className={cls.columnItem}>
                <Link href="/deliver" className={cls.listItem}>
                  {t("sign.up.to.deliver")}
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={cls.appSection}>
              <a
                href={settings?.customer_app_ios}
                className={cls.item}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/images/app-store.webp" alt="App store" />
              </a>
              <a
                href={settings?.customer_app_android}
                className={cls.item}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/images/google-play.webp" alt="Google play" />
              </a>
            </div>
            <div className={cls.social}>
              <a
                href={settings?.instagram_url}
                className={cls.socialItem}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramLineIcon />
              </a>
              <a
                href={settings?.twitter_url}
                className={cls.socialItem}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterFillIcon />
              </a>
              <a
                href={settings?.facebook_url}
                className={cls.socialItem}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookCircleFillIcon />
              </a>
            </div>
            <p className={cls.socialText}>{t("follow.us")}</p>
          </Grid>
        </Grid>

        <div className={cls.bottom}>
          <Grid
            container
            spacing={4}
            flexDirection={isMobile ? "column" : "row"}
          >
            <Grid item xs={12} md={6}>
              <p className={cls.text}>
                &copy; {new Date().getFullYear()} {settings?.footer_text}
              </p>
            </Grid>
            {!isMobile && <Grid item xs={12} md={3}></Grid>}
            <Grid
              item
              xs={12}
              md={3}
              alignSelf={isMobile ? "flex-start" : "flex-end"}
            >
              <div className={cls.flex}>
                <Link href="/privacy" className={cls.mutedLink}>
                  {t("privacy.policy")}
                </Link>
                <Link href="/terms" className={cls.mutedLink}>
                  {t("terms")}
                </Link>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </footer>
  );
}
