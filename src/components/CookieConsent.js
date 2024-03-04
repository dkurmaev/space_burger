"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  // Состояние для отображения всплывающего сообщения о соглашении с cookies
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  // Проверка, было ли соглашение с cookies уже принято
  useEffect(() => {
    const consentAccepted = localStorage.getItem("cookieConsentAccepted");
    if (!consentAccepted) {
      setShowCookieConsent(true);
    }
  }, []);

  // Функция для установки cookie
  const setCookie = (name, value, options = {}) => {
    let stringValue =
      typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

    if ("maxAge" in options) {
      options.expires = new Date(Date.now() + options.maxAge);
    }

    if ("path" in options) {
      options.path = options.path;
    }

    stringValue = serialize(name, String(value), options);

    document.cookie = stringValue;
  };

  // Обработчик принятия соглашения с cookies
  const handleAcceptCookieConsent = () => {
    localStorage.setItem("cookieConsentAccepted", "true");
    setShowCookieConsent(false);
  };

  // Обработчик отклонения соглашения с cookies
  const handleRejectCookieConsent = () => {
    // Здесь можно добавить необходимые действия при отклонении соглашения
    setShowCookieConsent(false);
  };

  return (
    <>
      {showCookieConsent && (
        <div className="cookies fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 flex justify-between items-center">
          <p className="mr-4">
            Diese Website verwendet Cookies, um das Benutzererlebnis zu
            verbessern. Durch die weitere Nutzung dieser Website stimmen Sie der
            Verwendung von Cookies zu.
          </p>
          <div>
            <button
              onClick={handleAcceptCookieConsent}
              className="bg-submit text-white px-4 py-2 rounded mr-2"
            >
              Akzeptieren
            </button>
            <button
              onClick={handleRejectCookieConsent}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Ablehnen
            </button>
          </div>
        </div>
      )}
    </>
  );
}
