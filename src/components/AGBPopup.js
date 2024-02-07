import Modal from "@/components/Modal";

const AGBPopup = ({ onAccept }) => {
  
  return (
    <Modal>
      <div className="popup rounded-lg text-gray-400 bg-bg ">
        <h2 className="text-2xl font-bold mt-4 text-center mb-4 text-primary">
          Unsere Allgemeine Geschäftsbedingungen
        </h2>

        <p className="mb-4 mt-5">
          <strong>Allgemeine Bestimmungen</strong>
        </p>
        <p className="mb-4">
          <strong>1.1.</strong> Diese Allgemeinen Geschäftsbedingungen (AGB)
          regeln die Bedingungen für die Nutzung unserer Dienstleistungen und
          Produkte.
        </p>

        <p className="mb-4">
          <strong>1.2.</strong> Durch die Nutzung unserer Dienstleistungen und
          Produkte erklären Sie sich mit diesen AGB einverstanden.
        </p>

        <p className="mb-4">
          <strong>Registrierung und Konto</strong>
        </p>
        <p className="mb-4">
          <strong>2.1.</strong> Für den Zugang zu bestimmten Dienstleistungen
          und Produkten kann eine Registrierung eines Kontos erforderlich sein.
        </p>

        <p className="mb-4">
          <strong>2.2.</strong> Alle im Registrierungsprozess bereitgestellten
          Informationen müssen korrekt und aktuell sein.
        </p>

        <p className="mb-4">
          <strong>Vertraulichkeit</strong>
        </p>
        <p className="mb-4">
          <strong>3.1.</strong> Wir verpflichten uns, die Vertraulichkeit Ihrer
          persönlichen Daten gemäß den geltenden Gesetzen einzuhalten.
        </p>

        <p className="mb-4">
          <strong>3.2.</strong> Wir verwenden Ihre persönlichen Daten nur zur
          Bereitstellung von Dienstleistungen und Produkten.
        </p>

        <p className="mb-4">
          <strong>Nutzung von Dienstleistungen und Produkten</strong>
        </p>
        <p className="mb-4">
          <strong>4.1.</strong> Die Nutzung unserer Dienstleistungen und
          Produkte muss den Gesetzen und ethischen Normen entsprechen.
        </p>

        <p className="mb-4">
          <strong>4.2.</strong> Wir behalten uns das Recht vor, die
          Bereitstellung von Dienstleistungen einzuschränken oder einzustellen,
          wenn gegen die AGB verstoßen wird.
        </p>

        <p className="mb-4">
          <strong>Haftung</strong>
        </p>
        <p className="mb-4">
          <strong>5.1.</strong> Wir übernehmen keine Haftung für Datenverlust
          oder Schäden an Ihrer Ausrüstung oder Software bei der Nutzung unserer
          Dienstleistungen.
        </p>

        <p className="mb-4">
          <strong>Einverstanden.</strong>
        </p>

        <div className="flex gap-4 items-center justify-center mt-4">
          <button
            className="submit flex justify-center text-gray-200 sticky top-0"
            onClick={onAccept}
          >
            Akzeptieren
          </button>
         {/*  <button
            className="beenden flex justify-center text-gray-200 sticky top-0"
            onClick={onDecline}
          >
            Ablehnen
          </button> */}
        </div>
      </div>
    </Modal>
  );
};

export default AGBPopup;
