import * as React from "react";
import { useEffect, useState } from "react";
import ScanQR from "./ScanQR";
import {
  IContextualMenuProps,
  IIconProps,
  Stack,
  IStackStyles,
  Layer,
} from "@fluentui/react";
import { CommandBarButton } from "@fluentui/react/lib/Button";
import { IOutputs } from "../generated/ManifestTypes";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface ButtonProps {
  setOutputs: (output: IOutputs) => void;
}
const Button = ({ setOutputs }: ButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const qrCodeIcon: IIconProps = { iconName: "QRCode" };
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleClickSuccess = () => {
    setOpenSuccess(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleClickError = () => {
    setOpenError(true);
  };

  const handleClose = () => {
    setOpenError(false);
  };

  return (
    <>
      <CommandBarButton
        styles={{
          root: {
            height: "auto",
            width: "-webkit-fill-available",
            color: "white",
            background: "#0078d4",
            padding: "0.75rem",

            ".ms-Button-flexContainer": {
              flexDirection: "column",
              gap: "0.5rem",
              i: {
                fontSize: "1.5rem",
                color: "white",
                ":hover": {
                  background: "#0078d4",
                },
              },
            },
          },
        }}
        primary={false}
        iconProps={qrCodeIcon}
        text="Scan QR Business Card"
        disabled={false}
        onClick={handleButtonClick}
      />
      {isOpen && (
        <ScanQR
          setOutputs={setOutputs}
          setOpen={setIsOpen}
          handleError={handleClickError}
          handleSuccess={handleClickSuccess}
        />
      )}
      <Layer>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openError}
          onClose={handleClose}
          sx={{ top: "6%" }}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Invalid QR-Code! Try again
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSuccess}
          onClose={handleCloseSuccess}
          sx={{ top: "6%" }}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Card successfully scanned!
          </Alert>
        </Snackbar>
      </Layer>
    </>
  );
};

export default Button;
