import React from "react";
import CookieBanner from "react-cookie-banner";

const CookieConsentComponent = () => {
  return (
    <CookieBanner
      message="Diese Website verwendet Cookies, um sicherzustellen, dass Sie die bestmögliche Erfahrung auf unserer Website erhalten."
      onAccept={() => {}}
      cookie="user-has-accepted-cookies"
      buttonMessage="Verstanden!"
    />
  );
};

export default CookieConsentComponent;
