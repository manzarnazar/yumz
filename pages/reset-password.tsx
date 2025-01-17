import React, { useState } from "react";
import SEO from "components/seo";
import AuthContainer from "containers/auth/auth";
import ResetPasswordForm from "components/resetPasswordForm/resetPasswordForm";
import VerifyPhoneCode from "components/verifyCodeForm/verifyPhoneCode";

type Props = {};
type RegisterViews = "RESET" | "VERIFY";

export default function ResetPassword({}: Props) {
  const [currentView, setCurrentView] = useState<RegisterViews>("RESET");
  const [callback, setCallback] = useState(() => {});
  const [verifyId, setVerifyId] = useState();
  const [phone, setPhone] = useState("");

  const handleChangeView = (view: RegisterViews) => setCurrentView(view);

  const renderView = () => {
    switch (currentView) {
      case "RESET":
        return (
          <ResetPasswordForm
            changeView={handleChangeView}
            onSuccess={({ phone, callback, verifyId }) => {
              setPhone(phone);
              setCallback(callback);
              setVerifyId(verifyId);
            }}
          />
        );
      case "VERIFY":
        return (
          <VerifyPhoneCode
            changeView={handleChangeView}
            phone={phone}
            callback={callback}
            setCallback={setCallback}
            verifyId={verifyId}
            onSuccess={({ phone, callback, verifyId }) => {
              setPhone(phone);
              setCallback(callback);
              setVerifyId(verifyId);
            }}
          />
        );
      default:
        return (
          <ResetPasswordForm
            changeView={handleChangeView}
            onSuccess={({ phone, callback }) => {
              setPhone(phone);
              setCallback(callback);
            }}
          />
        );
    }
  };

  return (
    <>
      <SEO />
      <AuthContainer>{renderView()}</AuthContainer>
    </>
  );
}
