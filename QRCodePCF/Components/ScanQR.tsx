// ** Utils
import * as React from "react";
// import vCard from "vcard";
import { QrReader } from "react-qr-reader";
import { IOutputs } from "../generated/ManifestTypes";
import { parseVCards } from "vcard4-ts";
import { IIconProps } from "@fluentui/react/lib/components/Icon";

interface IProps {
  setOpen: (open: boolean) => void;
  setOutputs: (output: IOutputs) => void;
  handleSuccess: () => void;
  handleError: () => void;
}

const ScanQR = ({
  setOpen,
  setOutputs,
  handleSuccess,
  handleError,
}: IProps) => {
  return (
    <QrReader
      videoStyle={{
        width: "100vw",
        height: "none",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
      onResult={(result, error) => {
        if (result) {
          try {
            let qrCodeData: IOutputs = {};
            const cards = parseVCards(result.getText());
            if (cards.vCards) {
              for (const card of cards.vCards) {
                let firstNames = "";
                let lastNames = "";
                card.N?.value.familyNames.forEach(
                  (n) => (lastNames += `${n} `)
                );
                card.N?.value.givenNames.forEach(
                  (n) => (firstNames += `${n} `)
                );
                qrCodeData.firstname = firstNames.trim();
                qrCodeData.lastName = lastNames.trim();
                qrCodeData.jobTitle = card.TITLE ? card.TITLE[0].value : "";
                qrCodeData.tel = card.TEL ? card.TEL[0].value : "";
                qrCodeData.street = card.ADR
                  ? `${card.ADR[0].value.streetAddress?.[0]}, ${card.ADR[0].value.streetAddress?.[1]}`
                  : "";
                qrCodeData.city = card.ADR
                  ? card.ADR[0].value.locality?.[0]
                  : "";
                qrCodeData.url = card.URL ? card.URL[0].value : "";
                qrCodeData.postalcode = card.ADR?.[0].value.postalCode?.[0];
                qrCodeData.account = card.ORG ? card.ORG[0].value[0] : "";
                if (card.unparseable?.length !== 0) {
                  card.unparseable?.forEach((unparseable) => {
                    if (qrCodeData.details) {
                      qrCodeData.details += unparseable + "\n";
                    } else {
                      qrCodeData.details = unparseable + "\n";
                    }
                  });
                }
              }
              setOutputs(qrCodeData);
              handleSuccess();
            } else if (!cards.vCards || cards.nags?.[0].isError) {
              handleError();
            }
            setOpen(false);
          } catch (e) {
            handleError();
          }
        }

        if (error) {
          console.info(error);
        }
      }}
      constraints={{ facingMode: "environment" }}
    />
  );
};

export default ScanQR;
